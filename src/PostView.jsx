import Markdown from 'react-markdown';
import { useParams, useOutletContext, Link } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import Pagination from './components/Pagination';
import BlogPost from './components/BlogPost';
import BlogPostImage from './components/BlogPostImage';
import Pill from './components/Pill';
import TagsContainer from './components/TagsContainer';
import Text from './components/Text';
import Empty from './components/Empty';
import EmptyContainerText from './components/EmptyContainerText';

function Post() {
  const { handleSearch, posts, postsToRender, currentPostIndex, errorMessage } =
    useOutletContext();

  const mainRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const [postData, setPostData] = useState({
    story: null,
    dimensions: null,
    imageLoaded: false,
  });

  const { slug } = useParams();

  const post = posts?.get(slug);

  const postReady = post && postData.imageLoaded;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getPostData = async function () {
      if (!post) {
        // setFound(false);
        return;
      }

      try {
        const img = new Image();

        img.onload = () => {
          setPostData(prev => ({
            ...prev,
            dimensions: { height: img.naturalHeight, width: img.naturalWidth },
            imageLoaded: true,
          }));
        };

        img.src = post.image.cover;

        const path = post ? post.story : null;
        if (!path) {
          return;
        }

        const response = await fetch(path, { signal });
        if (!response.ok) {
          throw new Error('*Something went wrong while loading the story :-(*');
        }

        const story = await response.text();
        setPostData(prev => ({ ...prev, story }));
        setLoading(false);
      } catch (error) {
        setPostData(prev => ({ ...prev, story: error.message }));
        setLoading(false);
      }
    };

    getPostData();

    return () => {
      controller.abort();
    };
  }, [post]);

  if (errorMessage) {
    return (
      <main className="loading-main">
        <Empty>
          <EmptyContainerText>
            <>
              <Text type="h2">{errorMessage}</Text>
              <Text type="p">Come back soon</Text>
            </>
          </EmptyContainerText>
        </Empty>
      </main>
    );
  }

  if (!post) {
    // return (
    //   <main className="loading-main">
    //     <RotatingSquare
    //       color="rgb(58, 58, 58)"
    //       ariaLabel="rotating-square-loading"
    //     />
    //   </main>
    // );

    return null;
  }

  return (
    <main className={`post-view${!loading ? ' visible' : ''}`} ref={mainRef}>
      <Pagination
        currentPostIndex={currentPostIndex + 1}
        lastPostIndex={postsToRender.length}
      />

      <BlogPost>
        {postReady ? (
          <BlogPostImage
            post={post}
            imgDimensions={postData.dimensions}
            imageLoaded={postData.imageLoaded}
          />
        ) : null}

        <div className="post-text">
          <Text type="h1">{post.title}</Text>
          <Text type="h2">
            {post.year} &middot; {post.location.city}, {post.location.country}
          </Text>

          <TagsContainer>
            {post.tags.map(tag => (
              <Link key={tag} to="/">
                <Pill tag={tag} handleSearch={handleSearch} />
              </Link>
            ))}
          </TagsContainer>

          <div className="markdown">
            <Markdown>{postData.story}</Markdown>
          </div>
        </div>
      </BlogPost>
    </main>
  );
}

function PostView() {
  const { slug } = useParams();
  return <Post key={slug} />;
}

export default PostView;
