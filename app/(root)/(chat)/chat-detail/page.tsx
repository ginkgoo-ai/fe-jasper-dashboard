"use client";

import { useEffect, useState } from "react";
import { Chat } from "@/components/chat";
import { ChatMessage } from "@/types/chat";
import {
  mockMessageAssistantLongText,
  mockMessageAssistantTextOnly,
  mockMessageAssistantWithAttachments,
  mockMessageAssistantWithCode,
  mockMessageAssistantWithTable,
  mockMessageUserTextOnly,
  mockMessageUserWithAttachments,
  mockMessageUserWithCode,
  mockMessageUserWithTable,
} from "./mock";

export default function ChatDetailPage() {
  const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      mockMessageUserTextOnly,
      mockMessageAssistantTextOnly,
      mockMessageUserWithTable,
      mockMessageAssistantWithTable,
      mockMessageUserWithAttachments,
      mockMessageAssistantWithAttachments,
      mockMessageUserWithCode,
      mockMessageAssistantWithCode,
      mockMessageAssistantLongText,
    ];
    setInitialMessages(mockMessages);
  }, []);

  return (
    <div className="flex h-0 w-full flex-1 flex-col">
      <Chat initialMessages={initialMessages} />
    </div>
  );
}
