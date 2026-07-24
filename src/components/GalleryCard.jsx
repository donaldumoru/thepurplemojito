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
        <li className="group relative aspect-square w-full cursor-pointer transition-all duration-150 ease-in-out sm:hover:z-1 sm:hover:scale-102">
          <div className="absolute top-0 z-2 flex h-8 w-full items-center justify-end gap-1.25 bg-(--location-bg) pr-1.25 text-[0.65rem] text-(--card-text) opacity-100 transition-all duration-150 ease-in-out sm:text-[0.8rem] sm:opacity-0 sm:group-hover:opacity-100">
            <IoLocationOutline className="hidden w-3.75 sm:block" />
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
            <div className="absolute right-0 bottom-0 left-0 flex h-8 items-center bg-(--title-bg) pl-1.25 text-[0.8rem] text-(--card-text) opacity-100 transition-all duration-150 ease-in-out sm:text-[1rem] sm:opacity-0 sm:group-hover:opacity-100">
              <Text type="p">{title}</Text>
            </div>
          </Link>
        </li>
      }
    </>
  );
}

export default GalleryCard;
