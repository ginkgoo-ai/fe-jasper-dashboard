"use client";

import { useEffect, useState } from "react";
import { Messages } from "@/components/chat/messages";
import { MultimodalInput } from "@/components/chat/multimodal-input";
import {
  // fetcher,
  generateUUID,
} from "@/lib/utils";
import { ChatMessage, ChatMessageAttachment, ChatStatus } from "@/types/chat";

interface ChatProps {
  chatId?: string;
  initialMessages?: ChatMessage[];
}

export function Chat(props: ChatProps) {
  const { chatId = "chat-id-1", initialMessages = [] } = props;

  const [multimodalValue, setMultimodalValue] = useState("");
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.READY);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [attachments, setAttachments] = useState<ChatMessageAttachment[]>([]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

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
        attachments: attachments.length > 0 ? attachments : undefined,
      },
    ]);
    setStatus(ChatStatus.SUBMITTED);
  };

  const handleMultimodalStop = () => {
    setStatus(ChatStatus.READY);
  };

  const handleAttachmentsChange = (attachments: ChatMessageAttachment[]) => {
    setAttachments(attachments);
  };

  return (
    <div className="bg-background flex h-full w-full flex-col">
      {/* Message List */}
      <div className="box-border flex h-0 w-full flex-1 flex-col overflow-y-auto">
        <Messages chatId={chatId} status={status} messages={messages} />
      </div>
      {/* Input Form */}
      <form className="bg-background mx-auto flex w-full pb-4 md:pb-6">
        <MultimodalInput
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
