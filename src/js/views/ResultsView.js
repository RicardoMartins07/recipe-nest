import View from "./View.js";
import previewView from "./PreviewView.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".recipes--results");

  _errorMessage = "No recipes found for your query! Please try again";
  _message = "";

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }

  _scrollTo() {
    const y =
      this._parentElement.getBoundingClientRect().top + window.scrollY - 120;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }

  _updateUI() {
    this._parentElement.classList.remove("hidden");
    this._scrollTo();
  }

  addHandlerClickResults(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const card = e.target.closest(".recipe-card");
      const cardId = card.dataset.id;
      handler(cardId);
    });
  }

  _generateSkeletonMarkup() {
    const markup = Array.from(
      { length: 3 },
      () => `
    <article class="recipe-card recipe-card--skeleton">
      <div class="skeleton-img"></div>

      <div class="recipe-card__body">
        <div class="skeleton-line skeleton-line--small"></div>
        <div class="skeleton-line skeleton-line--large"></div>
      </div>
    </article>
  `,
    ).join("");

    return markup;
  }
}

export default new ResultsView();
