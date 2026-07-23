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
import { RotatingSquare } from 'react-loader-spinner';

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
      <main className="mbs-16 items-center">
        <Empty>
          <EmptyContainerText>
            <>
              <Text type="h2" className="text-[1.1rem]">
                {errorMessage}
              </Text>
              <Text type="p">Come back soon</Text>
            </>
          </EmptyContainerText>
        </Empty>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="mbs-16 items-center">
        <RotatingSquare
          color="rgb(58, 58, 58)"
          ariaLabel="rotating-square-loading"
          wrapperStyle={{ justifyContent: 'center' }}
        />
      </main>
    );
  }

  return (
    <main
      className={`mx-4 flex flex-col justify-center border-b-[1.5px] border-(--dark-shade) transition-opacity duration-500 ease-in-out ${!loading ? 'opacity-100' : 'opacity-0'}`}
      ref={mainRef}
    >
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

        <div>
          <Text
            type="h1"
            className="text-[1.5rem] text-(--primary) sm:text-[2rem]"
          >
            {post.title}
          </Text>
          <Text
            type="h2"
            className="mb-6 font-(family-name:--subtitle) text-[1.2rem] sm:text-[1.5rem]"
          >
            {post.year} &middot; {post.location.city}, {post.location.country}
          </Text>

          <TagsContainer>
            {post.tags.map(tag => (
              <Link key={tag} to="/">
                <Pill tag={tag} handleSearch={handleSearch} />
              </Link>
            ))}
          </TagsContainer>

          <div className="prose mt-12 max-w-none pb-4 font-light selection:bg-(--accent) selection:text-(--background)">
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
