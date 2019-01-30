export class StatsResponse {
  messages: {
    filesCount: number;
    percentDone: number;
    total: number;
    totalUnique: number;
    translated: number;
    translatedUnique: number;
  };
  names: {
    filesCount: number;
    percentDone: number;
    total: number;
    translated: number;
  };
}
