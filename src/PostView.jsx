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

  const [postData, setPostData] = useState({
    story: null,
    dimensions: null,
    imageLoaded: false,
  });

  const post = posts?.get(slug);

  // useEffect(() => {
  //   if (!post || !slug) {
  //     return;
  //   }

  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   const getPostData = async function () {
  //     const img = new Image();
  //     img.onload = () => {
  //       setPostData(prev => ({
  //         ...prev,
  //         dimensions: { height: img.naturalHeight, width: img.naturalWidth },
  //         imageLoaded: true,
  //       }));
  //     };

  //     img.src = post.image.cover;

  //     try {
  //       const path = post ? post.story : null;
  //       if (!path) {
  //         return;
  //       }

  //       const response = await fetch(path, { signal });
  //       if (!response.ok) {
  //         throw new Error('*Something went wrong while loading the story :-(*');
  //       }

  //       const story = await response.text();
  //       setPostData(prev => ({ ...prev, story }));
  //     } catch (error) {
  //       setPostData(prev => ({ ...prev, story: error.message }));
  //     }
  //   };

  //   getPostData();

  //   return () => {
  //     controller.abort('fetch done');
  //     setPostData({ story: null, dimensions: null, imageLoaded: false });
  //   };
  // }, [post, slug]);

  // if (errorMessage) {
  //   return (
  //     <main className="loading-main">
  //       <Empty>
  //         <EmptyContainerText>
  //           <>
  //             <Text type="h2">{errorMessage}</Text>
  //             <Text type="p">Come back soon</Text>
  //           </>
  //         </EmptyContainerText>
  //       </Empty>
  //     </main>
  //   );
  // }

  // if (!post || !postData.dimensions) {
  //   return (
  //     <main className="loading-main">
  //       <RotatingSquare
  //         color="rgb(58, 58, 58)"
  //         ariaLabel="rotating-square-loading"
  //       />
  //     </main>
  //   );
  // }

  // return (
  //   <main className="post-view">
  //     <>
  //       <Pagination
  //         currentPostIndex={currentPostIndex + 1}
  //         lastPostIndex={postsToRender.length}
  //       />

  //       <BlogPost>
  //         {postData.dimensions ? (
  //           <BlogPostImage
  //             post={post}
  //             imgDimensions={postData.dimensions}
  //             imageLoaded={postData.imageLoaded}
  //           />
  //         ) : null}

  //         <div className="post-text">
  //           <Text type="h1">{post.title}</Text>
  //           <Text type="h2">
  //             {post.year} &middot; {post.location.city}, {post.location.country}
  //           </Text>

  //           <TagsContainer>
  //             {post.tags.length > 0 &&
  //               post.tags.map(tag => (
  //                 <Link
  //                   key={tag}
  //                   to="/"
  //                   viewTransition
  //                   onClick={() => {
  //                     document.documentElement.classList.remove(
  //                       'forward',
  //                       'backward',
  //                     );
  //                     document.documentElement.classList.add('backward');
  //                   }}
  //                 >
  //                   <Pill tag={tag} handleSearch={handleSearch} />
  //                 </Link>
  //               ))}
  //           </TagsContainer>

  //           <div className="markdown">
  //             <Markdown>{postData.story}</Markdown>
  //           </div>
  //         </div>
  //       </BlogPost>
  //     </>
  //   </main>
  // );

  console.log({
    slug,
    title: post?.title,
    currentPostIndex,
  });

  if (!post) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{currentPostIndex}</p>
    </main>
  );
}

export default PostView;
