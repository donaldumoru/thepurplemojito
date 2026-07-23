import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function BlogPostImage({ post, imgDimensions, imageLoaded }) {
  return (
    <div
      className={`float-left mr-4 mb-4 h-auto w-full ${
        imgDimensions.height > imgDimensions.width
          ? 'sm:w-2/5'
          : 'sm:mb-8 sm:h-[70vh]'
      }`}
      style={{
        aspectRatio: `${imgDimensions.width} / ${imgDimensions.height}`,
      }}
    >
      {!imageLoaded ? (
        <Skeleton width="100%" height="100%" />
      ) : (
        post && (
          <img
            className="size-full h-full object-cover object-center"
            src={post.image.cover}
            alt={`${post.title} image`}
          />
        )
      )}
    </div>
  );
}

export default BlogPostImage;
