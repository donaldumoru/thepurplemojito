import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function BlogPostImage({ image }) {
  const { cover, altText } = image;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`mbe-4`}>
      {!imageLoaded && <Skeleton width="100%" height={400} />}

      <img
        className="size-full h-full object-cover object-center"
        src={cover}
        alt={altText}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}

export default BlogPostImage;
