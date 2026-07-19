import { Link } from 'react-router';
import Text from './Text';

const ErrorPage = () => {
  return (
    <div>
      <Text type="h1">Oh no, this route doesn't exist!</Text>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
