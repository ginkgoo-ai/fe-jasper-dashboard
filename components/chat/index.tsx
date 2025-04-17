'use client';
import { v4 as uuidv4 } from 'uuid';

import { InputMultimodal } from '@/components/chat/input-multimodal';
import { Messages } from '@/components/chat/messages';
import { parseMessageContent } from '@/lib/utils';
import { chat } from '@/service/api';
import { ChatMessage, ChatMessageAttachment, ChatStatus } from '@/types/chat';
import { useState } from 'react';
import answer from './answer';

interface ChatProps {
  chatId: string;
}

export function Chat({ chatId }: ChatProps) {
  const [multimodalValue, setMultimodalValue] = useState('');
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.READY);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [attachments, setAttachments] = useState<ChatMessageAttachment[]>([]);
  const [requestController, setRequestController] = useState<{
    cancel: () => void;
  } | null>(null);

  const handleMultimodalInput = (value: string) => {
    setMultimodalValue(value);
  };

  // chat example: 城市是SAN CARLOS，分包商分类是C10, 帮我查分包商列表，不需要其他信息
  const handleMultimodalSubmit = async () => {
    const assistantMessageId = uuidv4();

    setMultimodalValue('');
    setStatus(ChatStatus.SUBMITTED);
    setMessages([
      ...messages,
      {
        id: uuidv4(),
        role: 'user',
        parts: [{ type: 'text', content: multimodalValue }],
        attachments: attachments.length > 0 ? attachments : undefined,
      },
    ]);

    try {
      const { cancel, request } = await chat(
        { chatId, message: multimodalValue },
        controller => {
          // 可以立即获取到 controller
          setRequestController({ cancel: () => controller.abort() });
        },
        res => {
          const parts = parseMessageContent(res);

          setStatus(ChatStatus.STREAMING);
          setMessages(prevMessages => {
            if (prevMessages.find(msg => msg.id === assistantMessageId)) {
              return prevMessages.map(msg =>
                msg.id === assistantMessageId ? { ...msg, parts } : msg
              );
            } else {
              return [
                ...prevMessages,
                {
                  ...answer.common,
                  id: assistantMessageId,
                  parts,
                },
              ];
            }
          });
        }
      );

      // 立即设置取消函数
      setRequestController({ cancel });

      try {
        await request;
      } catch (error: any) {
        throw error;
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.name === 'CanceledError') {
        setMessages(prev => {
          return [...prev, { ...answer.error.common, id: assistantMessageId }];
        });
      } else {
        setMessages(prev => {
          return [...prev, { ...answer.error.cancel, id: assistantMessageId }];
        });
      }
    } finally {
      setRequestController(null);
      setStatus(ChatStatus.READY);
      setMultimodalValue('');
      setAttachments([]);
    }
  };

  const handleMultimodalStop = () => {
    if (requestController) {
      requestController.cancel();
      setRequestController(null);
    }
    setMultimodalValue('');
    setAttachments([]);
    setStatus(ChatStatus.READY);
  };

  const handleAttachmentsChange = (attachments: ChatMessageAttachment[]) => {
    setAttachments(attachments);
  };

  return (
    <div className="bg-background flex h-full w-full flex-col overflow-hidden">
      {/* Message List */}
      <div className="box-border flex h-0 w-full flex-1 flex-col overflow-y-auto">
        <Messages status={status} messages={messages} />
      </div>
      {/* Input Form */}
      <form className="bg-background mx-auto box-border flex w-full px-[0.25rem] pb-4 pt-[0.25rem] md:pb-6">
        <InputMultimodal
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
