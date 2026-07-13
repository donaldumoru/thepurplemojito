import { Link } from 'react-router';
import { IoLocationOutline } from 'react-icons/io5';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function GalleryCard({ post }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { title } = post;
  const { thumbnail } = post.image;
  const { city, countryCode } = post.location;

  return (
    <>
      <Link to={`posts/${post.slug}`} viewTransition>
        {
          <article className="img-container">
            <div className="img-location">
              <IoLocationOutline />
              <span>
                {city}, {countryCode} {post.year}
              </span>
            </div>

            {!imageLoaded ? <Skeleton height="100%" /> : null}
            <img
              onLoad={() => {
                setImageLoaded(true);
              }}
              className="gallery-img"
              src={thumbnail}
              alt={title}
              loading="lazy"
            />

            <div className="img-title">
              <p>{title}</p>
            </div>
          </article>
        }
      </Link>
    </>
  );
}

export default GalleryCard;
