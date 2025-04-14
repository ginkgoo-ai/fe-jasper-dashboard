"use client";

import { useEffect, useState } from "react";
import { Chat } from "@/components/chat";
import { ChatMessage } from "@/types/chat";

// import {
//   mockMessageAssistantLongText,
//   mockMessageAssistantTextOnly,
//   mockMessageAssistantWithAttachments,
//   mockMessageAssistantWithTable,
//   mockMessageUserTextOnly,
//   mockMessageUserWithAttachments,
//   mockMessageUserWithTable,
// } from "./mock";

export default function ChatDetailPage() {
  const [initialMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // const mockMessages: ChatMessage[] = [
    //   mockMessageUserTextOnly,
    //   mockMessageAssistantTextOnly,
    //   mockMessageUserWithTable,
    //   mockMessageAssistantWithTable,
    //   mockMessageUserWithAttachments,
    //   mockMessageAssistantWithAttachments,
    //   mockMessageAssistantLongText,
    // ];
    // setInitialMessages(mockMessages);
  }, []);

  return (
    <div className="box-border flex h-0 w-full flex-1 flex-col pt-16">
      <Chat initialMessages={initialMessages} />
    </div>
  );
}
