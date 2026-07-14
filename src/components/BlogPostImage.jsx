import Skeleton from 'react-loading-skeleton';

function BlogPostImage({ post, imgDimensions, imageLoaded, setImageLoaded }) {
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
            // onLoad={() => setImageLoaded(true)}
            className={
              imgDimensions.height > imgDimensions.width
                ? 'portrait'
                : 'landscape'
            }
            src={post.image.cover}
            alt=""
          />
        )
      )}
    </div>
  );
}

export default BlogPostImage;
