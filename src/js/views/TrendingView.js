class SearchView {
  _parentElement = document.querySelector(".recipes--trending");

  addHandlerClickTrending(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const card = e.target.closest(".recipe-card");
      const cardQuery = card.dataset.query;
      handler(cardQuery);
    });
  }
}
export default new SearchView();
