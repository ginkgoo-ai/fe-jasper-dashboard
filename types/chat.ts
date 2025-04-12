/**
 * 聊天状态枚举
 */
export enum ChatStatus {
  // 基础状态
  IDLE = "idle", // 空闲状态
  LOADING = "loading", // 加载中
  SUCCESS = "success", // 成功
  ERROR = "error", // 错误

  // 输入状态
  READY = "ready", // 准备就绪，可以输入
  SUBMITTED = "submitted", // 已提交

  // 流处理状态
  STREAMING = "streaming", // 流式处理中
}

/**
 * 聊天状态类型
 */
export type ChatStatusType = keyof typeof ChatStatus;

// export interface Attachment {
//   name: string;
//   url: string;
//   contentType: string;
// }

// export interface Message {
//   /**
// A unique identifier for the message.
//    */
//   id: string;
//   /**
// The timestamp of the message.
//    */
//   createdAt?: Date;
//   /**
// Text content of the message. Use parts when possible.
//    */
//   content: string;
//   /**
// Reasoning for the message.

// @deprecated Use `parts` instead.
//    */
//   reasoning?: string;
//   /**
//    * Additional attachments to be sent along with the message.
//    */
//   experimental_attachments?: Attachment[];
//   /**
// The 'data' role is deprecated.
//    */
//   // data?: JSONValue;
//   /**
//    * Additional message-specific information added on the server via StreamData
//    */
//   // annotations?: JSONValue[] | undefined;
//   /**
// Tool invocations (that can be tool calls or tool results, depending on whether or not the invocation has finished)
// that the assistant made as part of this message.

// @deprecated Use `parts` instead.
//    */
//   // toolInvocations?: Array<ToolInvocation>;
//   /**
//    * The parts of the message. Use this for rendering the message in the UI.
//    *
//    * Assistant messages can have text, reasoning and tool invocation parts.
//    * User messages can have text parts.
//    */
//   // parts?: Array<
//   //   | TextUIPart
//   //   | ReasoningUIPart
//   //   | ToolInvocationUIPart
//   //   | SourceUIPart
//   //   | FileUIPart
//   //   | StepStartUIPart
//   // >;
// }

// export type UIMessage = Message;
