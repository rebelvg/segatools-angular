import { Name } from './name.model';

export class Message {
  _id: string;
  fileName: string;
  chapterName: string;
  lines: ILine[];
  nameIds: number[];
  names: Name[];
  percentDone: number;
  timeUpdated: Date;
  nextMessageId: string;
  prevMessageId: string;
}

export interface ILine {
  text: ITextLine;
  speakerId: number;
  count: number;
}

export interface ITextLine {
  japanese: string;
  english: string;
}
