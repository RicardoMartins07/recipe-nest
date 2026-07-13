export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);

    if (this._updateUI) this._updateUI();
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSkeleton() {
    this._clear();

    const markup = this._generateSkeletonMarkup();

    this._parentElement.classList.remove("hidden");

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    if (this._updateUI) this._updateUI();
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="message message--error">
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message message--success">
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
