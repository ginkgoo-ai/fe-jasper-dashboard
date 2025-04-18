import { ChatParams } from '@/types';
import ApiRequest from '../axios';

const ChatApi = {
  chat: '/ai/assistant',
};

const chat = async (
  { chatId, message, types, file }: ChatParams,
  onRequest?: (controller: AbortController) => void,
  onProgress?: (text: string) => void
): Promise<{ cancel: () => void; request: Promise<ChatParams> }> => {
  const controller = new AbortController();
  const formData = new FormData();

  formData.append('chatId', chatId);
  formData.append('message', message);
  file && formData.append('file', file);
  types?.forEach(type => {
    formData.append('types', type);
  });

  // 在发起请求前调用钩子
  onRequest?.(controller);

  let previousLength = 0;
  let res = '';

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

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.split('data:')[1];

          res += data;
          try {
            onProgress?.(res);
          } catch (e) {
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
