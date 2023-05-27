export default class Section {
  constructor({ data, renderer }, selector) {
    // this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item)
    });
  }

  addItem(element, addToStart) {
    if(addToStart) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
