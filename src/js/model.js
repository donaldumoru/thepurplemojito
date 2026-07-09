import posts from '../data/posts.json';

export const STATE = {
  posts: posts,
  currentPost: {
    post: {},
    adjacentPosts: {},
  },
  navigation: {},
  searchResults: [],
};

const getAdjacentPosts = function (source, currIndex) {
  const previousPost = source[currIndex - 1];
  const nextPosts = source.slice(currIndex + 1, currIndex + 3);
  STATE.currentPost.adjacentPosts.previous = previousPost;
  STATE.currentPost.adjacentPosts.next = nextPosts;
};

export const searchPosts = function () {};

const getNextAndPrevious = function (source) {
  const currentPost = STATE.currentPost.post;
  const currIndex = source.findIndex(post => post.id === currentPost.id);
  const previousPost = source[currIndex - 1];
  const nextPost = source[currIndex + 1];
  STATE.navigation.previous = previousPost;
  STATE.navigation.next = nextPost;
};

export const loadCurrentPost = function (id) {
  const clickedIndex = STATE.posts.findIndex(post => post.id === id);
  const clickedPost = STATE.posts[clickedIndex];
  if (!clickedPost) {
    return;
  }
  STATE.currentPost.post = clickedPost;
  const { posts } = STATE;
  getAdjacentPosts(posts, clickedIndex);
  getNextAndPrevious(posts);
  return clickedPost;
};
