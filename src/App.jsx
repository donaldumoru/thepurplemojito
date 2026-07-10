import Header from './components/Header';
import './App.css';
import { useState } from 'react';
import { Outlet, useMatch, useLocation, useParams } from 'react-router';
import { getRandomItems } from './helpers';

import data from './data/posts.json';

function App() {
  const isHome = Boolean(useMatch('/'));
  const { post: postId } = useParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(data);
  const [path, setPath] = useState('');

  function handleSearch(query) {
    setSearchQuery(query);
  }

  const postsToRender = posts.filter(post => {
    const { city, country } = post.location;
    const { title, year, tags } = post;
    const searchItems = [city, country, title, year, ...tags];
    return searchItems.some(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  });

  const allTags =
    postsToRender.length === 0 ? posts.map(post => post.tags).flat() : [];
  const emptyTags = getRandomItems(allTags, 5).filter(tag => tag);

  const currentPostIndex = postsToRender.findIndex(p => p.id === postId);

  const nextPath =
    currentPostIndex < postsToRender.length - 1
      ? `posts/${postsToRender.at(currentPostIndex + 1).id}`
      : null;

  const prevPath =
    currentPostIndex > 0
      ? `posts/${postsToRender.at(currentPostIndex - 1).id}`
      : null;

  return (
    <>
      <Header isHome={isHome} nextPath={nextPath} prevPath={prevPath} />
      <Outlet
        context={{
          postsToRender,
          handleSearch,
          searchQuery,
          emptyTags,
          currentPostIndex,
        }}
      />
    </>
  );
}

export default App;
