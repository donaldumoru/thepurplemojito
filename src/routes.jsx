import App from './App';
import { HomeView, PostView, ErrorPage } from './imports';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeView /> },
      { path: 'posts/:slug', element: <PostView /> },
    ],
  },
];

export default routes;
