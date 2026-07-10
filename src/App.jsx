import Header from './components/Header';
import HomeView from './HomeView';
import PostView from './PostView';
import './App.css';
import { useState } from 'react';
import { Outlet, useLocation, useMatch } from 'react-router';

function App() {
  const [atHome, setAtHome] = useState(true);

  const isHome = Boolean(useMatch('/'));

  return (
    <>
      <Header isHome={isHome} />
      <Outlet />
    </>
  );
}

export default App;
