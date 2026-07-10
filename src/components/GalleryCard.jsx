import { Link } from 'react-router';
import { IoLocationOutline } from 'react-icons/io5';

function GalleryCard({ post, handleSetAtHome }) {
  const { thumbnail } = post.image;
  return (
    <Link to={`post/${post.id}`} viewTransition>
      <article className="img-container" onClick={handleSetAtHome}>
        <div className="img-location">
          <IoLocationOutline />
          <span>
            {post.location} {post.year}
          </span>
        </div>
        <img className="gallery-img" src={thumbnail} alt={post.title} />
        <div className="img-title">
          <p>{post.title}</p>
        </div>
      </article>
    </Link>
  );
}

export default GalleryCard;
