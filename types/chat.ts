export enum ChatStatus {
  READY = "ready",
  SUBMITTED = "submitted",

  STREAMING = "streaming",

  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ChatMessagePart {
  type: "text";
  text?: string;
}

export interface ChatMessageAttachment {
  id?: string;
  name: string;
  contentType: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system" | "greeting";
  parts: ChatMessagePart[];
  attachments?: ChatMessageAttachment[];
}
