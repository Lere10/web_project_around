export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._render = renderer;
    this._selector = document.querySelector(classSelector);
  }
  renderer() {
    this._items.forEach((item) => {
      this._render(item);
    });
  }
  addItem(item) {
    this._selector.prepend(item);
  }
}
