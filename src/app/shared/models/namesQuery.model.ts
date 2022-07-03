import qs from 'query-string';
import { isEmpty } from 'lodash';

interface INamesQuery {
  search: string;
  hideCompleted: boolean;
  hideNotCompleted: boolean;
  sortBy: boolean;
  sortOrder: number;
}
export class NamesQuery {
  params = <INamesQuery>{
    hideCompleted: true,
  };

  constructor() {
    const params = qs.parse(location.search);
    this.setParams(params);
  }

  setParams(params: INamesQuery) {
    this.params = params;
  }
}
