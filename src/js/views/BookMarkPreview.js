import View from "./View.js";

class BookMarkPreview extends View {
  _parentElement = "";

  _generateMarkup() {
    return `
      <article class="bookmark-card" data-id="${this._data.id}">
        <img
          class="bookmark-card__image"
          src="${this._data.image}"
          alt="${this._data.title}"
        />

        <div class="bookmark-card__content">
          <h4 class="bookmark-card__title">
            ${this._data.title}
          </h4>

          <p class="bookmark-card__publisher">
            ${this._data.publisher}
          </p>
        </div>
      </article>
    `;
  }
}

export default new BookMarkPreview();
