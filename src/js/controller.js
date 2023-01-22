import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable'; //for pollfyiling
import 'regenerator-runtime/runtime'; //for pollfyiling async await
import { loadSearchResults } from './model.js';

// if (module.hot) {
//   module.hot.accept();
// }
///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 0) Update results view to mark selected search result
    resultView.update(model.getSearchResultsPage());
    recipeView.renderSpinner();
    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2)Rendering the recipe
    recipeView.render(model.state.recipe);

    // 3) Updating bookmarks
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    // 1) Get search query
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search result
    await model.loadSearchResults(query);

    // 3) Render search results
    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultsPage(1));

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  console.log(goToPage);
  // 1) Render NEW results
  resultView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe View
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const newfunction = function () {
  console.log('New Feature was added to the Website');
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  console.log('Welcome');
  //something was added
  newfunction();
};
init();
