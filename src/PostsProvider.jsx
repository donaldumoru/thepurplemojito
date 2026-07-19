import supabase from './supabase/supabase-client';
import { PostModel } from './helpers';
import { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getRandomItems } from './helpers';
import Header from './components/Header';

const PostsContext = createContext({ posts: [] });

function PostsProvider({ children }) {
  const { slug } = useParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(new Map());
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getPosts = async function () {
      try {
        const { data, error } = await supabase
          .from('thepurplemojito')
          .select('*')
          .order('created_at', { ascending: false });

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
    <PostsContext
      value={{
        posts,
        postsToRender,
        handleSearch,
        searchQuery,
        emptyTags,
        currentPostIndex,
        errorMessage,
        setErrorMessage,
        nextPath,
        prevPath,
      }}
    >
      {children}
    </PostsContext>
  );
}

export { PostsProvider, PostsContext };
