import View from "./View.js";
import { createIcons, icons } from "lucide";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe-details");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _message = "";

  _updateUI() {
    this._parentElement.classList.remove("hidden");
    createIcons({ icons });
    this._scrollTo();
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }
  _scrollTo() {
    const offset = 24;

    const y =
      this._parentElement.getBoundingClientRect().bottom +
      window.scrollY -
      offset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }

  update() {}

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmark-btn");
      if (!btn) return;

      handler();
    });
  }

  updateBookmarkButton(isBookmarked) {
    const btn = this._parentElement.querySelector(".bookmark-btn");

    btn.classList.toggle("active", isBookmarked);

    btn.innerHTML = `
    <i data-lucide="${isBookmarked ? "bookmark-check" : "bookmark"}"></i>
  `;

    createIcons({ icons });
  }

  _generateMarkup() {
    return `
      <div class="recipe-details__media">
        <img src="${this._data.image}" alt="${this._data.title}" />
      </div>

      <div class="recipe-details__content">
        <span class="eyebrow">Selected recipe</span>

        <div class="recipe-details__header">
          <h2>${this._data.title}</h2>

          <button
            class="bookmark-btn ${this._data.bookmarked ? "active" : ""}"
            type="button"
            aria-label="Add to bookmarks"
            data-id="${this._data.id}"
          >
            <i data-lucide="${this._data.bookmarked ? "bookmark-check" : "bookmark"}"></i>
          </button>
        </div>

        <div class="recipe-meta">
          <div>
            <span>Cooking time</span>
            <strong>${this._data.cookingTime} min</strong>
          </div>
          <div>
            <span>Servings</span>
            <strong>${this._data.servings} people</strong>
          </div>
          <div>
            <span>Publisher</span>
            <strong>${this._data.publisher}</strong>
          </div>
        </div>

        <section class="ingredients">
          <h3>Ingredients</h3>

          <ul>
            ${this._data.ingredients
              .map(
                (ing) => `
                  <li>
                    ${ing.quantity ?? ""} ${ing.unit ?? ""} ${ing.description}
                  </li>
                `,
              )
              .join("")}
          </ul>
        </section>

        <a class="source-link" href="${this._data.sourceUrl}" target="_blank">
          Open full directions
        </a>
      </div>
    `;
  }

  _generateSkeletonMarkup() {
    return `
    <div class="recipe-details__media">
      <div class="skeleton skeleton--recipe-img"></div>
    </div>

    <div class="recipe-details__content">
      <div class="skeleton skeleton--eyebrow"></div>

      <div class="recipe-details__header">
        <div class="skeleton skeleton--title"></div>
        <div class="skeleton skeleton--bookmark"></div>
      </div>

      <div class="recipe-meta">
        <div>
          <div class="skeleton skeleton--meta-label"></div>
          <div class="skeleton skeleton--meta-value"></div>
        </div>
        <div>
          <div class="skeleton skeleton--meta-label"></div>
          <div class="skeleton skeleton--meta-value"></div>
        </div>
        <div>
          <div class="skeleton skeleton--meta-label"></div>
          <div class="skeleton skeleton--meta-value"></div>
        </div>
      </div>

      <section class="ingredients">
        <div class="skeleton skeleton--section-title"></div>

        <ul class="skeleton-ingredients">
          ${Array.from(
            { length: 6 },
            () => `<li><div class="skeleton skeleton--ingredient"></div></li>`,
          ).join("")}
        </ul>
      </section>

      <div class="skeleton skeleton--button"></div>
    </div>
  `;
  }
}

export default new RecipeView();
