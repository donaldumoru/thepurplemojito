import Header from './components/Header';
import './App.css';
import { useEffect, useState } from 'react';
import { Outlet, useMatch, useLocation, useParams } from 'react-router';
import { getRandomItems } from './helpers';

// import data from './data/posts.json';

function App() {
  const isHome = Boolean(useMatch('/'));
  const { post: slug } = useParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getPosts = async function () {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          signal: controller.signal,
        });

        if (!response) {
          throw new Error('no whine me');
        }

        const result = await response.json();
        const map = new Map(result.map(post => [post.slug, post]));
        setPosts(map);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();

    return () => {
      controller.abort();
    };
  }, []);

  function handleSearch(query) {
    setSearchQuery(query);
  }

  const postsToRender = posts
    ? Array.from(posts.values()).filter(post => {
        const { city, country } = post.location;
        const { title, year, tags } = post;
        const searchItems = [city, country, title, year, ...tags];
        return searchItems.some(item =>
          item.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      })
    : [];

  const allTags =
    postsToRender.length === 0
      ? posts
        ? posts.map(post => post.tags).flat()
        : []
      : [];

  const emptyTags = getRandomItems(allTags, 5).filter(tag => tag);

  const currentPostIndex = postsToRender.findIndex(p => p.slug === slug);

  const nextPath =
    currentPostIndex < postsToRender.length - 1
      ? `posts/${postsToRender.at(currentPostIndex + 1).slug}`
      : null;

  const prevPath =
    currentPostIndex > 0
      ? `posts/${postsToRender.at(currentPostIndex - 1).slug}`
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
          posts,
        }}
      />
    </>
  );
}

export default App;
