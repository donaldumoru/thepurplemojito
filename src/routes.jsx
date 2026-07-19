import App from './App';
import HomeView from './HomeView';
import PostView from './PostView';
import ErrorPage from './components/ErrorPage';

const routes = [
  {
    path: '/',
    element: <HomeView />,
    errorElement: <ErrorPage />,
  },

  {
    path: '/posts/:slug',
    element: <PostView />,
  },
];

export default routes;
