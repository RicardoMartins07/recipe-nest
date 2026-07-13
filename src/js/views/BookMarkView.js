import BookMarkPreview from "./BookMarkPreview.js";
import View from "./View.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__dropdown");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => BookMarkPreview.render(bookmark, false))
      .join("");
  }

  addHandlerClickBookMark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const card = e.target.closest(".bookmark-card");
      if (!card) return;
      const cardId = card.dataset.id;
      handler(cardId);
    });
  }
}

export default new BookmarksView();
