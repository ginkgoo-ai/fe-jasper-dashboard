import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicationError, FetchStreamParams } from "@/types/fetch";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const router2url = (strPath: string, objParams: Record<string, string> = {}) => {
  let strResult = strPath;
  let isFirstParam = !strPath.includes("?");

  for (const key in objParams) {
    if (isFirstParam) {
      strResult += `?${key}=${objParams[key]}`;
      isFirstParam = false;
    } else {
      strResult += `&${key}=${objParams[key]}`;
    }
  }

  return strResult;
};

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.") as ApplicationError;

    error.info = await res.json();
    error.status = res.status;

    throw error;
  }

  return res.json();
};

export const fetchStream = async (params: FetchStreamParams) => {
  const {
    url = "",
    method = "GET",
    headers = { "Content-Type": "application/json" },
    query = {},
    body,
    onDealChunk,
    onChunk,
    onComplete,
    onError,
  } = params;

  const controller = new AbortController();

  const cancelFetch = () => {
    controller.abort();
  };

  const urlWithQuery = router2url(url, query);

  try {
    const config: Record<string, any> = {
      method,
      headers,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(urlWithQuery, config);

    if (!response.body) {
      throw new Error("ReadableStream not supported");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let responseText = "";

    const readStream = async () => {
      const { done, value } = await reader.read();

      if (done) {
        onComplete();
        return;
      }

      const chunk = decoder.decode(value, { stream: true });
      responseText += onDealChunk ? onDealChunk(chunk) : chunk;

      onChunk(responseText);

      return readStream();
    };

    readStream().catch((error) => {
      if (error.name === "AbortError") {
        console.log("Stream request cancelled");
      } else {
        onError(error);
      }
    });

    return cancelFetch;
  } catch (error) {
    console.error("Stream API request error:", error);
    if (error instanceof Error && error.name !== "AbortError") {
      onError(error);
    }

    return cancelFetch;
  }
};

export const fetchEventSource = (params: FetchStreamParams) => {
  const { url = "", query = {}, onDealChunk, onChunk, onComplete, onError } = params;

  const urlWithQuery = router2url(url, query);
  let eventSource: EventSource | null = null;
  let responseText = "";

  try {
    // Create EventSource instance
    eventSource = new EventSource(urlWithQuery);

    // Handle message event
    eventSource.onmessage = (event) => {
      const chunk = event.data;
      responseText += onDealChunk ? onDealChunk(chunk) : chunk;
      onChunk(responseText);
    };

    // Handle connection open event
    eventSource.onopen = () => {
      console.log("EventSource connection opened");
    };

    // Handle error event
    eventSource.onerror = (error) => {
      console.log("EventSource onerror:", eventSource);
      if (eventSource?.readyState === EventSource.CLOSED) {
        console.error("EventSource error:", error);
        onError(new Error("EventSource connection error"));
      }
      eventSource?.close();
      onComplete?.();
    };

    // Return cancel function
    return () => {
      if (eventSource) {
        eventSource.close();
        console.log("EventSource connection closed");
        onComplete?.();
      }
    };
  } catch (error) {
    console.error("Error creating EventSource:", error);
    if (error instanceof Error) {
      onError(error);
    }
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }
};
