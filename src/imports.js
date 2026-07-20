import { lazy } from 'react';

const PostView = lazy(() => import('./PostView.jsx'));
const HomeView = lazy(() => import('./HomeView.jsx'));
const ErrorPage = lazy(() => import('./ErrorPage'));

export { HomeView, PostView, ErrorPage };
