import Header from './components/Header';
import './App.css';
import { useState } from 'react';
import { Outlet, useMatch } from 'react-router';

import data from './data/posts.json';

function App() {
  const isHome = Boolean(useMatch('/'));

  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(data);

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function handlePostNavigation() {}

  const postsToRender = posts.filter(post => {
    const { city, country } = post.location;
    const { title, year, tags } = post;

    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <>
      <Header isHome={isHome} handlePostNavigation={handlePostNavigation} />
      <Outlet context={{ postsToRender, handleSearch, searchQuery }} />
    </>
  );
}

export default App;
