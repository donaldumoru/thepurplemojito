import { useParams } from 'react-router';
import { useOutletContext } from 'react-router';

function PostView() {
  const { postsToRender } = useOutletContext();
  const { post: postId } = useParams();
  if (!postId) {
    return;
  }

  const postToRender = postsToRender.find(p => p.id === postId);

  const { city, countryCode } = postToRender.location;

  return (
    <main className="post-view">
      <h1>
        You are now viewing a very amazing picture that was shot in {city},{' '}
        {countryCode}
      </h1>

      <img src={`/${postToRender.image.cover}`} alt="" />
    </main>
  );
}

export default PostView;
