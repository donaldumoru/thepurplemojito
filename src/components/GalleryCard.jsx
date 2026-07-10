import { Link } from 'react-router';
import { IoLocationOutline } from 'react-icons/io5';

function GalleryCard({ post }) {
  const { title } = post;
  const { thumbnail } = post.image;
  const { city, countryCode } = post.location;

  return (
    <Link to={`post/${post.id}`} viewTransition>
      <article className="img-container">
        <div className="img-location">
          <IoLocationOutline />
          <span>
            {city}, {countryCode} {post.year}
          </span>
        </div>
        <img className="gallery-img" src={thumbnail} alt={title} />
        <div className="img-title">
          <p>{title}</p>
        </div>
      </article>
    </Link>
  );
}

export default GalleryCard;
