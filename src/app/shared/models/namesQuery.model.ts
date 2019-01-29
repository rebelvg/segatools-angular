export class NamesQuery {
  search = '';
  hideCompleted = true;
  constructor(search, hideCompleted) {
    this.search = search ? search : '';
    this.hideCompleted = hideCompleted;
  }
}
