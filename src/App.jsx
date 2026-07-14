import supabase from './supabase/supabase-client';
import Header from './components/Header';
import './App.css';
import { useEffect, useState } from 'react';
import { Outlet, useMatch, useParams } from 'react-router';
import { getRandomItems } from './helpers';

import { PostModel } from './helpers';

const test = {
  slug: 'lisbon-yellow-tram-turn',
  title: 'Yellow Tram Turn',
  year: 2024,
  city: 'Lisbon',
  country: 'Portugla',
  country_code: 'PT',
  tags: ['coffee', 'friends', 'cafe', 'party'],
  cover_image:
    'https://glnisnrojngbrrotgaih.supabase.co/storage/v1/object/public/posts/lisbon-yellow-tram-turn/cover.webp',
  thumbnail:
    'https://glnisnrojngbrrotgaih.supabase.co/storage/v1/object/public/posts/lisbon-yellow-tram-turn/thumb.webp',
  story:
    'https://glnisnrojngbrrotgaih.supabase.co/storage/v1/object/public/posts/lisbon-yellow-tram-turn/story.md',
};

// import data from './data/posts.json';

function App() {
  const isHome = Boolean(useMatch('/'));
  const { post: slug } = useParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(
    // new Map(data.map(post => [post.slug, post])),
    new Map(),
  );

  const connect = async function () {
    try {
      const { data, error } = await supabase
        .from('thepurplemojito')
        .insert([test])
        .single();

      if (error) {
        console.error(error);
        return;
      }

      const result = await data;
      console.log(result);
    } catch (error) {}
  };

  useEffect(() => {
    const getPosts = async function () {
      try {
        const { data, error } = await supabase
          .from('thepurplemojito')
          .select('*');

        if (error) {
          throw new Error('no whine me');
        }

        const formattedData = data.map(post => new PostModel(post));
        const map = new Map(formattedData.map(post => [post.slug, post]));

        setPosts(map);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);

  // const [posts, setPosts] = useState(null);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const getPosts = async function () {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/posts', {
  //         signal: controller.signal,
  //       });

  //       if (!response) {
  //         throw new Error('no whine me');
  //       }

  //       const result = await response.json();
  //       const map = new Map(result.map(post => [post.slug, post]));
  //       setPosts(map);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getPosts();

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  function handleSearch(query) {
    setSearchQuery(query);
  }

  const postsToRender = posts
    ? Array.from(posts.values()).filter(post => {
        const { city, country } = post.location;
        const { title, year, tags } = post;
        const searchItems = [city, country, title, year + '', ...tags];
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
      <button onClick={connect}>Add Test</button>
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
