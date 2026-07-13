class PopularView {
  _parentElement = document.querySelector(".search-suggestions");

  addHandlerClickPopular(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const query = e.target.dataset.query;
      handler(query);
    });
  }
}
export default new PopularView();
