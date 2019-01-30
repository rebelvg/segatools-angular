import { isNil } from 'lodash';

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
    console.log('pagination set');
    this.page = !isNil(params.page) ? +params.page : this.page;
    this.pages = !isNil(params.pages) ? +params.pages : this.pages;
    this.total = !isNil(params.total) ? +params.total : this.total;
    this.limit = !isNil(params.limit) ? +params.limit : this.limit;
  }
}
