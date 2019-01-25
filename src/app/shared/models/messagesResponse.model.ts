import { Message } from './message.model';

export class MessagesResponse {
  messages: Message[];
  page: number;
  pages: number;
  total: number;
  limit: number;
}
