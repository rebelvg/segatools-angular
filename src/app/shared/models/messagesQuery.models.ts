import { forOwn, isArray, toInteger, isNil, isString } from 'lodash';
import qs from 'query-string';
export interface IMessageQuery {
  sortBy: string;
  soryOrder: number;
  search: [];
  searchStrict: [];
  chapterName: string;
  fileName: string;
  speakersCount: number;
  names: [];
  namesStrict: [];
  percentDone: number;
  hideChanged: boolean;
  hideCompleted: boolean;
  hideNotCompleted: boolean;
}

export class MessagesQuery {
  params = {};
  fields = {
    sortBy: {},
    soryOrder: { isNumber: true },
    search: {},
    searchStrict: {},
    chapterName: {},
    fileName: {},
    speakersCount: { isNumber: true },
    names: {},
    namesStrict: {},
    percentDone: { isNumber: true },
    hideChanged: {},
    hideCompleted: {},
    hideNotCompleted: {}
  };

  constructor() {
    const params = qs.parse(location.search, { arrayFormat: 'bracket' });
    console.log(params);
    this.setParams(params);
  }

  setParams(params = {}) {
    this.params = params;
  }

  getQueryCount() {
    return Object.keys(this.params).length;
  }

  flatStrictData(field: string) {
    const fieldArrayStrict = this.params[`${field}`] || [];
    const fieldArray = this.params[`${field}Strict`] || [];
    console.log(fieldArray, fieldArrayStrict);
    return [
      ...fieldArrayStrict.map(item => ({
        value: item,
        strict: false
      })),
      ...fieldArray.map(item => ({
        value: item,
        strict: true
      }))
    ];
  }

  stringify = params => qs.stringify(params, { arrayFormat: 'bracket' });

  getFormParams() {
    console.log(this.params);
    const params = <IMessageQuery>{ ...this.params };
    console.log(params);

    const getField = field => (!isNil(params[field]) ? params[field] : null);

    const searchArray = this.flatStrictData('search');

    const nameArray = this.flatStrictData('names');

    const formParams = {
      search: searchArray,
      chapterName: getField('chapterName'),
      fileName: getField('fileName'),
      speakersCount: getField('speakersCount'),
      names: nameArray,
      hideChanged: getField('hideChanged'),
      hideCompleted: getField('hideCompleted'),
      hideNotCompleted: getField('hideNotCompleted')
    };

    return formParams;
  }
}
