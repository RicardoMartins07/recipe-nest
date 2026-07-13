import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination__btn");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    if (curPage === 1 && numPages > 1) {
      return `
        <button class="pagination__btn btn-next" type="button" data-goto="${curPage + 1}">
          Next
        </button>
      `;
    }

    if (curPage === numPages && numPages > 1) {
      return `
        <button class="pagination__btn btn-prev" type="button" data-goto="${curPage - 1}">
          Prev
        </button>
      `;
    }

    if (curPage < numPages) {
      return `
        <button class="pagination__btn btn-prev" type="button" data-goto="${curPage - 1}">
          Prev
        </button>

        <button class="pagination__btn btn-next" type="button" data-goto="${curPage + 1}">
          Next
        </button>
      `;
    }

    return "";
  }
}

export default new PaginationView();
