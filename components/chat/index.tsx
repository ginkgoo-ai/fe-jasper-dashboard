"use client";

import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { InputMultimodal } from "@/components/chat/input-multimodal";
import { Messages } from "@/components/chat/messages";
import {
  fetchEventSource,
  // fetcher,
} from "@/lib/utils";
import { ChatMessage, ChatMessageAttachment, ChatStatus } from "@/types/chat";

interface ChatProps {
  chatId?: string;
  initialMessages?: ChatMessage[];
}

export function Chat(props: ChatProps) {
  const { chatId = uuidv4(), initialMessages = [] } = props;

  const [multimodalValue, setMultimodalValue] = useState("");
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.READY);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [attachments, setAttachments] = useState<ChatMessageAttachment[]>([]);

  const cancelFetchRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleMultimodalInput = (value: string) => {
    setMultimodalValue(value);
  };

  const handleMultimodalSubmit = () => {
    const assistantMessageId = uuidv4();

    setMultimodalValue("");
    setMessages([
      ...messages,
      {
        id: uuidv4(),
        role: "user",
        parts: [{ type: "text", content: multimodalValue }],
        attachments: attachments.length > 0 ? attachments : undefined,
      },
    ]);
    setStatus(ChatStatus.SUBMITTED);

    cancelFetchRef.current = fetchEventSource({
      url: "https://api-jasper.ginkgoo.dev/api/ai/assistant",
      // url: "https://192.168.31.205:6011/assistant",
      query: {
        message: multimodalValue,
        chatId: chatId,
      },
      onChunk: (responseText) => {
        setStatus(ChatStatus.STREAMING);
        setMessages((prevMessages) => {
          if (prevMessages.find((msg) => msg.id === assistantMessageId)) {
            // Update the assistant message with the new text
            return prevMessages.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    parts: [{ type: "text", content: responseText }],
                  }
                : msg
            );
          } else {
            // Create a new assistant message
            return [
              ...prevMessages,
              {
                id: assistantMessageId,
                role: "assistant",
                parts: [{ type: "text", content: responseText }],
              },
            ];
          }
        });
      },
      onError: (error) => {
        console.error("Fetch Error:", error);
        toast.error(error.message);
        setStatus(ChatStatus.READY);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  parts: [{ type: "text", content: "Sorry, the request failed. Please try again later." }],
                }
              : msg
          )
        );
      },
      onComplete: () => {
        setStatus(ChatStatus.READY);
        cancelFetchRef.current = null;
      },
    });
  };

  const handleMultimodalStop = () => {
    if (cancelFetchRef.current) {
      cancelFetchRef.current();
      cancelFetchRef.current = null;
    }
    setStatus(ChatStatus.READY);
  };

  const handleAttachmentsChange = (attachments: ChatMessageAttachment[]) => {
    setAttachments(attachments);
  };

  return (
    <div className="bg-background flex h-full w-full flex-col overflow-hidden">
      {/* Message List */}
      <div className="box-border flex h-0 w-full flex-1 flex-col overflow-y-auto">
        <Messages chatId={chatId} status={status} messages={messages} />
      </div>
      {/* Input Form */}
      <form className="bg-background mx-auto box-border flex w-full px-[0.25rem] pb-4 pt-[0.25rem] md:pb-6">
        <InputMultimodal
          chatId={chatId}
          value={multimodalValue}
          status={status}
          attachments={attachments}
          onInput={handleMultimodalInput}
          onSubmit={handleMultimodalSubmit}
          onStop={handleMultimodalStop}
          onAttachmentsChange={handleAttachmentsChange}
        />
      </form>
    </div>
  );
}
