class SearchView {
  _parentElement = document.querySelector(".search");

  constructor() {
    this._addHandlerToggleButton();
  }

  getQuery() {
    const query = this._parentElement.querySelector(".search__input").value;
    this._clearInput();
    return query;
  }

  _toggleButton() {
    const input = this._parentElement.querySelector(".search__input");
    const btn = this._parentElement.querySelector(".search__btn");

    btn.disabled = input.value.trim() === "";
  }

  _clearInput() {
    this._parentElement.querySelector(".search__input").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _addHandlerToggleButton() {
    this._toggleButton();

    this._parentElement.addEventListener("input", () => {
      this._toggleButton();
    });
  }
}
export default new SearchView();
