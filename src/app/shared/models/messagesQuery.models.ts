import { forOwn, isArray, toInteger, isNil, isString } from 'lodash';

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

  constructor(params = {}) {
    this.setParams(params);
  }

  setParams(params = {}) {
    forOwn(params, this.validate);
  }

  getQueryCount() {
    return Object.keys(this.params).length;
  }

  validate = (value, key) => {
    if (!this.fields[key]) {
      return;
    }

    if (!!value && !isArray(value)) {
      this.params[key] = this.fields[key].isNumber ? toInteger(value) : value;
    }

    if (isArray(value) && value.length) {
      this.params[key] = value.filter(item => !!item);
    }
  }

  formatArrayData(data: string) {
    if (!data) {
      return [];
    }
    return isString(data) ? JSON.parse('[' + data + ']') : data;
  }

  flatStrictData(field: string) {
    const fieldArrayStrict = this.formatArrayData(this.params[`${field}`]);
    const fieldArray = this.formatArrayData(this.params[`${field}Strict`]);
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

  getFormParams() {
    const params = <IMessageQuery>{ ...this.params };

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
