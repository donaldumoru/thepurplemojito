import { useContext, useRef } from 'react';
import ThemeContext from '../DarkModeContext';
import { BsMoonStarsFill } from 'react-icons/bs';
import { BsSun } from 'react-icons/bs';

import { NavLink } from 'react-router';
import Pill from './Pill';

function NavListItem({ children, isHome, path }) {
  return (
    <li
      className={`${isHome ? 'invisible' : 'visible'}${!path ? ' cursor-not-allowed' : ''}`}
    >
      {children}
    </li>
  );
}

function NavButton({ label, path }) {
  return (
    <NavLink
      to={path}
      className={`${!path ? 'pointer-events-none opacity-60' : ''} text-2xl tracking-widest text-(--primary) sm:text-[2rem] dark:text-(--dark-primary)`}
    >
      {label}
    </NavLink>
  );
}

function Logo() {
  return (
    <li className="logo">
      <NavLink
        to="/"
        className="text-[2rem] font-semibold tracking-widest text-(--primary) sm:text-5xl dark:text-(--dark-primary)"
      >
        TPM
      </NavLink>
    </li>
  );
}

function Header({ isHome, nextPath, prevPath, setTheme }) {
  const previousTheme = useContext(ThemeContext);
  const currentTheme = previousTheme === 'dark' ? 'light' : 'dark';

  const htmlRef = useRef(document.documentElement).current;

  function handleThemeToggle() {
    setTheme(currentTheme);
    htmlRef.classList.remove(...htmlRef.classList);
    htmlRef.classList.add(currentTheme);

    localStorage.setItem('tpm-theme', currentTheme);
  }

  return (
    <header className="m-4 pbe-4 sm:mx-6 sm:pbs-4 sm:pbe-4 md:mx-10 xl:mx-36">
      <div className="mb-8 flex justify-end" onClick={handleThemeToggle}>
        {/* <Pill
          tag={`Go ${previousTheme === 'dark' ? 'Light' : 'Dark'}`}
          handler={handleThemeToggle}
        /> */}

        {currentTheme === 'light' ? (
          <BsSun className="aspect-square h-full w-6 cursor-pointer fill-(--dark-primary)" />
        ) : (
          <BsMoonStarsFill className="aspect-square h-full w-6 cursor-pointer fill-(--primary)" />
        )}
      </div>
      <nav className="flex justify-center sm:m-0">
        <ul className="flex size-full justify-between">
          <NavListItem isHome={isHome} path={prevPath}>
            <NavButton label="prev" path={prevPath}></NavButton>
          </NavListItem>

          <Logo />

          <NavListItem isHome={isHome} path={nextPath}>
            <NavButton label="next" path={nextPath}></NavButton>
          </NavListItem>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
