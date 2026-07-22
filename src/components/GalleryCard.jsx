import { Link } from 'react-router';
import { IoLocationOutline } from 'react-icons/io5';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Text from './Text';

function GalleryCard({ post }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { title } = post;
  const { thumbnail } = post.image;
  const { city, countryCode } = post.location;

  return (
    <>
      {
        <article className="group relative aspect-square w-full cursor-pointer transition-all duration-150 ease-in-out sm:hover:z-1 sm:hover:scale-102">
          <div className="bg-location-bg text-card-text absolute top-0 z-2 flex h-8 w-full items-center justify-end gap-1.25 pr-1.25 text-[0.8rem] opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
            <IoLocationOutline className="w-3.75" />
            <span>
              {city}, {countryCode} {post.year}
            </span>
          </div>

          {!imageLoaded ? <Skeleton height="100%" /> : null}
          <img
            onLoad={() => {
              setImageLoaded(true);
            }}
            className="absolute size-full object-cover"
            src={thumbnail}
            alt={title}
          />

          <Link to={`posts/${post.slug}`}>
            <span className="absolute inset-0"></span>
            <div className="bg-title-bg text-card-text absolute right-0 bottom-0 left-0 flex h-8 items-center pl-1.25 text-[1rem] opacity-100 transition-all duration-150 ease-in-out sm:text-[1.3rem] sm:opacity-0 sm:group-hover:opacity-100">
              <Text type="p">{title}</Text>
            </div>
          </Link>
        </article>
      }
    </>
  );
}

export default GalleryCard;
