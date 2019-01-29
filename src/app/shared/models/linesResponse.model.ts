import { Message } from './message.model';

export class LinesResponse {
  lines: Message[];
  page: number;
  pages: number;
  total: number;
  limit: number;
}
