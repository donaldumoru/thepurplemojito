import View from './View';
import { toggleVisibility } from '../utils';

class PostView extends View {
  _parentElement = document.querySelector('.post-view');
  _controlBtns = document.querySelectorAll('.control-btn');

  _generateHTML() {
    return `
        <div class="post-img-container">
          <img
            class="post-img"
            src=""
            alt=""
          />
        </div>
    `;
  }

  initRenderPost() {
    this.showAndHideView();
  }

  async renderPost(post) {
    const { full: imageSrc } = post.image;
    const isLandscape = await this.loadImage(imageSrc);
    const className = isLandscape ? 'landscape' : 'portrait';
    /// TODO: switch the slide in direction
    document.startViewTransition(() => this.updateImage(imageSrc, className));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadImage(newSrc) {
    const newPostImage = new Image();
    const isLandscape = new Promise(function (resolve, reject) {
      newPostImage.addEventListener('load', function () {
        const { naturalHeight, naturalWidth } = newPostImage;
        resolve(naturalWidth > naturalHeight);
        // TODO: think about the reject part of this
      });
    });
    newPostImage.src = newSrc;
    return isLandscape;
  }

  updateImage(newSrc, imgClass) {
    const postImage = this._parentElement.querySelector('.post-img');
    postImage.classList.remove('portrait', 'landscape');
    postImage.classList.add(imgClass);
    postImage.src = newSrc;
  }

  updateControlBtns(ids) {
    const btns = [...this._controlBtns];
    for (let i = 0; i < btns.length; i++) {
      const btn = btns[i];
      const id = ids[btn.dataset.direction];
      if (!id) {
        continue;
      }
      btn.dataset.goToId = ids[btn.dataset.direction].id;
    }
  }

  addHandlerPostsNavigation(handler) {
    this._controlBtns.forEach(btn =>
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const button = e.target;
        if (!button) {
          return;
        }
        const id = btn.dataset.goToId;
        handler(id);
      }),
    );
  }
}

export default new PostView();
