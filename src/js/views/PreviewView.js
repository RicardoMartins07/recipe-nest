import View from "./View.js";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `

      <article class="recipe-card" data-id=${this._data.id}>
            <img
              src="${this._data.image}"
              alt="${this._data.title}"
            />
            <div class="recipe-card__body">
              <span>${this._data.publisher}</span>
              <h3>${this._data.title}</h3>
              
            </div>
          </article>
    `;
  }
}

export default new PreviewView();
