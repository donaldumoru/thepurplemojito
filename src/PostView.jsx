import Markdown from 'react-markdown';
import { useParams, useOutletContext, Link } from 'react-router';
import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';
import 'react-loading-skeleton/dist/skeleton.css';
import { RotatingSquare } from 'react-loader-spinner';
import BlogPost from './components/BlogPost';
import BlogPostImage from './components/BlogPostImage';
import Pill from './components/Pill';
import TagsContainer from './components/Tags';
import Text from './components/Text';
import Empty from './components/Empty';
import EmptyContainerText from './components/EmptyContainerText';

function PostView() {
  const { handleSearch, posts, postsToRender, currentPostIndex, errorMessage } =
    useOutletContext();
  const { post: slug } = useParams();

  const [story, setStory] = useState('');
  const [dimensions, setDimensions] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // const path = `/posts/${slug}/story.md`;
  const post = posts?.get(slug);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getPostData = async function () {
      const img = new Image();
      if (post) {
        img.src = post.image.cover;
        img.onload = () => {
          setDimensions({
            height: img.naturalHeight,
            width: img.naturalWidth,
          });

          setImageLoaded(true);
        };
      }

      try {
        const path = post ? post.story : null;
        if (!path) {
          return;
        }

        const response = await fetch(path, { signal });
        if (!response.ok) {
          throw new Error('*Something went wrong while loading the story :-(*');
        }

        const story = await response.text();
        setStory(story);
      } catch (error) {
        setStory(error.message);
      }
    };

    getPostData();

    return () => controller.abort('fetch done');
  }, [post]);

  return (
    <main className={!post || !dimensions ? 'loading-main' : 'post-view'}>
      {errorMessage ? (
        <Empty>
          <EmptyContainerText>
            <>
              <Text type="h2">{errorMessage}</Text>
              <Text type="p">Come back soon</Text>
            </>
          </EmptyContainerText>
        </Empty>
      ) : !post || !dimensions ? (
        <RotatingSquare
          color="rgb(58, 58, 58)"
          ariaLabel="rotating-square-loading"
        />
      ) : (
        <>
          <Pagination
            currentPostIndex={currentPostIndex + 1}
            lastPostIndex={postsToRender.length}
          />

          <BlogPost>
            {dimensions ? (
              <BlogPostImage
                post={post}
                imgDimensions={dimensions}
                imageLoaded={imageLoaded}
                setImageLoaded={setImageLoaded}
              />
            ) : null}

            <div className="post-text">
              <Text type="h1">{post.title}</Text>
              <Text type="h2">
                {post.year} &middot; {post.location.city},{' '}
                {post.location.country}
              </Text>

              <TagsContainer>
                {post.tags.length > 0 &&
                  post.tags.map(tag => (
                    <Link
                      key={tag}
                      to="/"
                      viewTransition
                      onClick={() => {
                        document.documentElement.classList.remove(
                          'forward',
                          'backward',
                        );
                        document.documentElement.classList.add('backward');
                      }}
                    >
                      <Pill tag={tag} handleSearch={handleSearch} />
                    </Link>
                  ))}
              </TagsContainer>

              <div className="markdown">
                <Markdown>{story}</Markdown>
              </div>
            </div>
          </BlogPost>
        </>
      )}
    </main>
  );
}

export default PostView;
