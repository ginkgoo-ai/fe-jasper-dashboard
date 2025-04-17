import { ChatParams } from '@/types';
import ApiRequest from '../axios';

const ChatApi = {
  chat: '/ai/assistant',
};

const chat = async (
  { chatId, message, file }: ChatParams,
  onRequest?: (controller: AbortController) => void,
  onProgress?: (text: string) => void
): Promise<{ cancel: () => void; request: Promise<ChatParams> }> => {
  const controller = new AbortController();
  const formData = new FormData();

  formData.append('chatId', chatId);
  formData.append('message', message);
  file && formData.append('file', file);

  // 在发起请求前调用钩子
  onRequest?.(controller);

  let previousLength = 0;

  const request = ApiRequest.post<ChatParams>(ChatApi.chat, formData, {
    headers: {
      Accept: 'text/event-stream',
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'stream',
    signal: controller.signal,
    onDownloadProgress: (progressEvent: any) => {
      const responseText = progressEvent.event.target.responseText;

      // 只处理新增的部分
      const newText = responseText.substring(previousLength);
      previousLength = responseText.length;

      const lines = newText.split('\n');
      let res = '';

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.split('data:')[1]?.trim();

          if (data === '[DONE]') break;

          try {
            // const parsedData = JSON.parse(data);
            onProgress?.((res += data));
          } catch (e) {
            // 如果解析失败但不是空字符串，记录错误
            if (data && data !== '') {
              console.error('解析数据失败:', e, '原始数据:', data);
            }
          }
        }
      }
    },
  });

  return {
    cancel: () => controller.abort(),
    request,
  };
};

export { chat };
