"use client";

import { useEffect, useState } from "react";
import { Chat } from "@/components/chat";
import { ChatMessage } from "@/types/chat";
import {
  mockMessageWithAttachmentsForAssistant,
  mockMessageWithAttachmentsForUser,
  mockMessageWithLongTextForAssistant,
  mockMessageWithSheetForAssistant,
  mockMessageWithSheetForUser,
  mockMessageWithTableForAssistant,
  mockMessageWithTableForUser,
  mockMessageWithTextOnlyForAssistant,
  mockMessageWithTextOnlyForUser,
} from "./mock";

export default function ChatDetailPage() {
  const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      mockMessageWithTextOnlyForUser,
      mockMessageWithTextOnlyForAssistant,
      mockMessageWithTableForUser,
      mockMessageWithTableForAssistant,
      mockMessageWithAttachmentsForUser,
      mockMessageWithAttachmentsForAssistant,
      mockMessageWithLongTextForAssistant,
      mockMessageWithSheetForUser,
      mockMessageWithSheetForAssistant,
    ];
    setInitialMessages(mockMessages);
  }, []);

  return (
    <div className="box-border flex h-0 w-full flex-1 flex-col pt-16">
      <Chat initialMessages={initialMessages} />
    </div>
  );
}
