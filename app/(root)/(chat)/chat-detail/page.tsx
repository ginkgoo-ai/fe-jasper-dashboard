"use client";

import { useEffect, useState } from "react";
import { Chat } from "@/components/chat";
import { ChatMessage } from "@/types/chat";

export default function ChatDetailPage() {
  const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const mockMessages: ChatMessage[] = [];
    for (let i = 0; i < 10; i++) {
      mockMessages.push({
        id: `message-${i}`,
        role: Math.random() > 0.5 ? "user" : "assistant",
        parts: [{ type: "text", text: `Hello, how are you? ${i}` }],
        attachments: [{
          id: `attachment-${i}-1`,
          name: `imgAyakaLogoBiteGithub.png`,
          contentType: "image/png",
          url: `https://oss.orz2.online/BiteMakerChrome/AYAKA/imgAyakaLogoBiteGithub.png`,
        },{
          id: `attachment-${i}-2`,
          name: `imgAyakaLogoBiteJira.png`,
          contentType: "image/png",
          url: `https://oss.orz2.online/BiteMakerChrome/AYAKA/imgAyakaLogoBiteJira.png`,
        }],
      });
    }
    setInitialMessages(mockMessages);
  }, []);

  return (
    <div className="flex h-0 w-full flex-1 flex-col">
      <Chat initialMessages={initialMessages} />
    </div>
  );
}
