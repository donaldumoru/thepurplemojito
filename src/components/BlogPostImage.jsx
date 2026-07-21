import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function BlogPostImage({ post, imgDimensions, imageLoaded }) {
  return (
    <div
      className={`post-img-container ${
        imgDimensions.height > imgDimensions.width
          ? 'portrait-wrapper'
          : 'landscape-wrapper'
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
            className={
              imgDimensions.height > imgDimensions.width
                ? 'portrait'
                : 'landscape'
            }
            src={post.image.cover}
            alt={`${post.title} image`}
          />
        )
      )}
    </div>
  );
}

export default BlogPostImage;
