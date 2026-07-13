import { createIcons, icons } from "lucide";
import { MODAL_CLOSE_SEC } from "./config.js";

import * as model from "./model.js";
import searchView from "./views/SearchView.js";
import popularView from "./views/PopularView.js";
import resultsView from "./views/ResultsView.js";
import trendingView from "./views/TrendingView.js";
import recipeView from "./views/RecipeView.js";
import bookmarkView from "./views/BookMarkView.js";
import paginationView from "./views/PaginationView.js";
import AddRecipeView from "./views/AddRecipeView.js";
import BookMarkView from "./views/BookMarkView.js";
import BookMarkPreview from "./views/BookMarkPreview.js";

createIcons({ icons });

const init = function () {
  model.init();

  searchView.addHandlerSearch(controlSumbitForm);
  popularView.addHandlerClickPopular(controClickPopular);
  trendingView.addHandlerClickTrending(controClickPopular);
  resultsView.addHandlerClickResults(controlClickRecipe);
  recipeView.addHandlerBookmark(controlBookMarkClick);

  //Add handler to pagination
  paginationView.addHandlerClick(controlPagination);

  //Add Handler Submit Add Recipe
  AddRecipeView.addHandlerUpload(controlUploadRecipe);

  BookMarkView.addHandlerRender(controlBookmarks);
  BookMarkView.addHandlerClickBookMark(controlClickBookmarkCard);
};

const controlBookmarks = function () {
  BookMarkView.render(model.state.bookmarks);
};

const controlSumbitForm = function () {
  const query = searchView.getQuery();
  controlSearchResults(query);
};

const controClickPopular = function (query) {
  controlSearchResults(query);
};

const controlSearchResults = async function (query) {
  try {
    if (!query) return;
    resultsView.renderSkeleton();
    recipeView.hide();

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlClickRecipe = async function (id) {
  try {
    if (!id) return;
    recipeView.renderSkeleton();

    const data = await model.getRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

const controlBookMarkClick = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //recipeView.update(model.state.recipe);

  recipeView.updateBookmarkButton(model.state.recipe.bookmarked);
  BookMarkView.render(model.state.bookmarks);
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    AddRecipeView.renderMessage();

    // Render bookmark view
    //bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    AddRecipeView.renderError(err.message);
  }
};

const controlClickBookmarkCard = function (id) {
  controlClickRecipe(id);
};

init();
