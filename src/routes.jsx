import App from './App';
import { HomeView, PostView, ErrorPage } from './imports.js';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeView /> },
      { path: 'posts/:post', element: <PostView /> },
    ],
  },
];

export default routes;
