import { forOwn, isArray, toInteger } from 'lodash';

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
  };
}
