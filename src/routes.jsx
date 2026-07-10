import App from './App';
import HomeView from './HomeView';
import PostView from './PostView';
import ErrorPage from './components/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <HomeView /> },
      { path: 'post/:post', element: <PostView /> },
    ],
  },
];

export default routes;
