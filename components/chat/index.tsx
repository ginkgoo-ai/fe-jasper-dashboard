"use client";

import { useState } from "react";
import { Messages } from "@/components/chat/messages";
import { MultimodalInput } from "@/components/chat/multimodal-input";
import {
  // fetcher,
  generateUUID,
} from "@/lib/utils";
import { ChatStatus } from "@/types/chat";

interface ChatProps {
  chatId?: string;
  initialMessages?: Array<any>;
}

export function Chat(props: ChatProps) {
  const { chatId = "chat-id-1", initialMessages = [] } = props;

  const [multimodalValue, setMultimodalValue] = useState("");
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.READY);
  const [messages, setMessages] = useState<Array<any>>(initialMessages);
  const [attachments, setAttachments] = useState<Array<any>>([]);

  const handleMultimodalInput = (value: string) => {
    setMultimodalValue(value);
  };

  const handleMultimodalSubmit = () => {
    setMultimodalValue("");
    setMessages([
      ...messages,
      {
        id: generateUUID(),
        role: "user",
        parts: [{ type: "text", text: multimodalValue }],
        experimental_attachments: attachments.length > 0 ? attachments : undefined,
      },
    ]);
    setStatus(ChatStatus.SUBMITTED);
  };

  const handleMultimodalStop = () => {
    setStatus(ChatStatus.READY);
  };

  const handleAttachmentsChange = (attachments: Array<any>) => {
    setAttachments(attachments);
  };

  return (
    <div className="bg-background flex h-full w-full flex-col">
      {/* Message List */}
      <Messages chatId={chatId} status={status} messages={messages} />
      {/* Input Form */}
      <form className="bg-background mx-auto flex w-full pb-4 md:pb-6">
        <MultimodalInput
          chatId={chatId}
          value={multimodalValue}
          status={status}
          attachments={attachments}
          messages={messages}
          onInput={handleMultimodalInput}
          onSubmit={handleMultimodalSubmit}
          onStop={handleMultimodalStop}
          onAttachmentsChange={handleAttachmentsChange}
        />
      </form>
    </div>
  );
}
