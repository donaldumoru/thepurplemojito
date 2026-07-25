import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function BlogPostImage({ post, imageLoaded }) {
  const { cover, altText } = post.image;

  return (
    <div className={`mbe-4 ${!imageLoaded ? 'h-100' : ''}`}>
      {!imageLoaded ? (
        <Skeleton width="100%" height="100%" />
      ) : (
        post && (
          <img
            className="size-full h-full object-cover object-center"
            src={cover}
            alt={altText}
          />
        )
      )}
    </div>
  );
}

export default BlogPostImage;
