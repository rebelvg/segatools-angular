import { omit, pick, keys } from 'lodash';
import qs from 'query-string';

interface Paginator {
  page: number;
  pages: number;
  total: number;
  limit: number;
}

export class Pagination {
  data = {
    page: 1,
    limit: 20,
    pages: null,
    total: null
  };

  constructor(page = 1, limit = 20) {
    this.data.page = page;
    this.data.limit = limit;
  }

  getQuery() {
    return omit(this.data, ['total', 'pages']);
  }

  setPagination() {
    const params = qs.parse(location.search);

    this.data.page = params.page ? +params.page : this.data.page;
    this.data.pages = params.pages ? +params.pages : this.data.pages;
  }

  setPage(page) {
    this.data.page = page;
  }

  setPaginatorData(params: any) {
    this.data = <Paginator>pick(params, keys(this.data));
  }
}
