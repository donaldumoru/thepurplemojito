import * as model from './model';
import homeView from './views/homeView';
import postView from './views/postView';

homeView.render(model.STATE.posts);
postView.render(model.STATE.currentPost);

const controlCurrentPost = function (id) {
  const clickedPost = model.loadCurrentPost(id);
  postView.initRenderPost();
  postView.renderPost(clickedPost);
  homeView.switchToPostView();
  postView.updateControlBtns(model.STATE.navigation);
};

const controlPostsNavigation = function (id) {
  if (!id) {
    return;
  }
  const clickedPost = model.loadCurrentPost(id);
  postView.updateControlBtns(model.STATE.navigation);
  postView.renderPost(clickedPost);
};

// initialize handlers
const initHandlers = function () {
  homeView.addHandlerImageClick(controlCurrentPost);
  postView.addHandlerPostsNavigation(controlPostsNavigation);
};

initHandlers();
