export class Pagination {
  page: number;
  pages: number;
  total: number;
  limit: number;
  constructor(page, limit) {
    this.page = page;
    this.limit = limit;
  }
}
