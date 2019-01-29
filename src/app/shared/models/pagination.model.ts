export class Pagination {
  page: number;
  pages: number;
  total: number;
  limit: number;
  constructor(page, limit) {
    this.page = page;
    this.limit = limit;
  }
  getQuery() {
    return { page: this.page, limit: this.limit };
  }
  setPagination(params) {
    this.page = params.page ? +params.page : this.page;
    this.pages = params.pages ? +params.pages : this.pages;
    this.total = params.total ? +params.total : this.total;
    this.limit = params.limit ? +params.limit : this.limit;
  }
}
