import View from './View';
import { toggleVisibility } from '../utils';
import locationIcon from 'url:../../img/location.svg';

class HomeView extends View {
  _parentElement = document.querySelector('.home-view');
  _controlBtns = document.querySelectorAll('.control-btn-wrapper');

  addHandlerImageClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const parent = e.target.closest('.img-container');
      if (!parent) {
        return;
      }
      const postId = parent.dataset.id;
      handler(postId);
    });
  }

  addHandlerSearch(handler) {}

  _generateHTML() {
    return `
    <section class="gallery-section">
      ${this._data
        .map((item, index) => {
          const { thumbnail } = item.image;
          return `<article class="img-container" data-index="${index}" data-id="${item.id}">
          <div class="img-location">
              <img src="${locationIcon}">
              <span>${item.location} ${item.year}</span>
          </div>
          <img class="gallery-img" src="${thumbnail}" alt="">
          <div class="img-title">
              <p>${item.title}</p>
          </div>
        </article>`;
        })
        .join('')}
    </section>
    `;
  }

  switchToPostView() {
    if (!document.startViewTransition) {
      return;
    }
    [...this._controlBtns].forEach(btn => {
      toggleVisibility(btn, { active: 'show', inactive: 'hide' });
    });
    this.showAndHideView();
  }
}

export default new HomeView();
