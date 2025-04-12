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
  const { chatId = generateUUID(), initialMessages = [] } = props;

  const [multimodalValue, setMultimodalValue] = useState("");
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.IDLE);
  const [messages, setMessages] = useState<Array<any>>(initialMessages);
  const [attachments, setAttachments] = useState<Array<any>>([]);

  const handleMultimodalInput = (value: string) => {
    setMultimodalValue(value);
  };

  const handleMultimodalSubmit = () => {
    console.log("handleMultimodalSubmit", multimodalValue);
    setMultimodalValue("");
    setMessages([...messages, { role: "user", content: multimodalValue }]);
    setStatus(ChatStatus.SUBMITTED);
  };

  const handleMultimodalStop = () => {
    console.log("handleMultimodalStop");
    setStatus(ChatStatus.IDLE);
  };

  const handleAttachmentsChange = (attachments: Array<any>) => {
    setAttachments(attachments);
  };

  return (
    <>
      <div className="bg-background flex h-full w-full flex-col">
        <div className="flex flex-1 flex-col"></div>

        <Messages chatId={chatId} status={status} messages={messages} />

        <form className="bg-background mx-auto flex w-full px-4 pb-4 md:pb-6">
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
    </>
  );
}
