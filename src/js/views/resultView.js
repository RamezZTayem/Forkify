// import recipeView from './recipeView';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
import View from './View.js';
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `no recipes found for your query! Please try again`;
  _message = '';

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join(' ');
  }
}
export default new ResultView();
