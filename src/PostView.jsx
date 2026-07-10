import { useParams } from 'react-router';
import posts from './data/posts.json';

function PostView() {
  const { post } = useParams();
  if (!post) {
    return;
  }

  const postToRender = posts.find(p => p.id === post);
  console.log(postToRender);

  return (
    <main className="post-view">
      <h1>
        You are now viewing a very amazing picture that was shot in{' '}
        {postToRender.location}
      </h1>

      <img src={`/${postToRender.image.full}`} alt="" />
    </main>
  );
}

export default PostView;
