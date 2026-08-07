import supabase from './supabase/supabase-client';
import Header from './components/Header';
import './App.css';
import { useEffect, useState } from 'react';
import { Outlet, useMatch, useParams } from 'react-router';
import ThemeContext from './DarkModeContext';
import { getRandomItems, setSingleClass } from './helpers';
import PostModel from './supabase/post-model';
import stamp from './assets/icons/stamp.webp';

function App() {
  const isHome = Boolean(useMatch('/'));
  const { slug } = useParams();

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const setMode = function () {
      const savedTheme = localStorage.getItem('tpm-theme');
      if (savedTheme) {
        setTheme(savedTheme);
        return;
      }

      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const prefersDark = mql.matches;

      const theme = prefersDark ? 'dark' : 'light';
      setTheme(theme);

      const html = document.documentElement;
      setSingleClass(html, theme);
      localStorage.setItem('tpm-theme', theme);
    };

    setMode();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(new Map());
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getPosts = async function () {
      try {
        const { data, error } = await supabase
          .from(import.meta.env.VITE_DB_TABLE)
          .select('*')
          .order('year', { ascending: false });

        if (error) {
          throw new Error('No posts have been published yet');
        }

        const formattedData = data.map(post => new PostModel(post));
        const map = new Map(formattedData.map(post => [post.slug, post]));

        setPosts(map);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getPosts();
  }, []);

  function preloadStamp() {
    const img = new Image();
    img.src = stamp;
  }

  useEffect(preloadStamp, []);

  function handleSearch(query) {
    setSearchQuery(query);
  }

  const postsToRender = posts
    ? Array.from(posts.values()).filter(post => {
        const { city, country, countryCode } = post.location;
        const { title, year, tags } = post;
        const searchItems = [
          city,
          country,
          countryCode,
          title,
          year + '',
          ...tags,
        ];
        return searchItems.some(item =>
          item.toLowerCase().includes(searchQuery.toLowerCase().trim()),
        );
      })
    : [];

  const allTags =
    postsToRender.length === 0
      ? posts
        ? Array.from(posts.values())
            .map(post => post.tags)
            .flat()
        : []
      : [];

  const emptyTags = getRandomItems(
    allTags,
    allTags.length > 5 ? 5 : allTags.length - 1,
  ).filter(tag => tag);

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
      <ThemeContext value={theme}>
        <Header
          isHome={isHome}
          nextPath={nextPath}
          prevPath={prevPath}
          setTheme={setTheme}
        />
        <Outlet
          context={{
            postsToRender,
            handleSearch,
            searchQuery,
            emptyTags,
            currentPostIndex,
            posts,
            errorMessage,
            setErrorMessage,
          }}
        />
      </ThemeContext>
    </>
  );
}

export default App;
