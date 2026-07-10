import Markdown from 'react-markdown';
import { useParams, useOutletContext } from 'react-router';
import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';

function PostView() {
  const { postsToRender, currentPostIndex } = useOutletContext();
  const { post: postId } = useParams();
  const [story, setStory] = useState('');
  const [imgDimensions, setImgDimensions] = useState({ height: 0, width: 0 });

  function handleImageLoad(e) {
    const { naturalHeight, naturalWidth } = e.target;
    setImgDimensions({ height: naturalHeight, width: naturalWidth });
  }

  const path = `/posts/${postId}/story.md`;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getStory = async function () {
      try {
        const response = await fetch(path, { signal });
        if (!response.ok) {
          throw new Error('we will get back to this later'); // TODO: handle this in the catch block and DISPLAY empty state
        }

        const story = await response.text();
        setStory(story);
      } catch (error) {
        console.log(error);
      }
    };

    getStory();

    return () => controller.abort();
  }, [path]);

  if (!postId) {
    return;
  }

  const postToRender = postsToRender.find(p => p.id === postId);

  return (
    <main className="post-view">
      <Pagination
        currentPostIndex={currentPostIndex + 1}
        lastPostIndex={postsToRender.length}
      />

      <article>
        <img
          onLoad={handleImageLoad}
          className={
            imgDimensions.height > imgDimensions.width
              ? 'portrait'
              : 'landscape'
          }
          src={`/${postToRender.image.cover}`}
          alt=""
        />

        <div className="">
          <Markdown>{story}</Markdown>
        </div>
      </article>
    </main>
  );
}

export default PostView;
