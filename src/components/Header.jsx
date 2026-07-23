import { NavLink } from 'react-router';

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
      className={`${!path ? 'pointer-events-none text-(--primary) opacity-60' : 'text-(--primary)'} text-2xl tracking-widest sm:text-[2rem]`}
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
        className="text-[2rem] font-semibold tracking-widest text-(--primary) sm:text-5xl"
      >
        TPM
      </NavLink>
    </li>
  );
}

function Header({ isHome, nextPath, prevPath }) {
  return (
    <header className="pbe-4 sm:pbs-8 sm:pbe-4">
      <nav className="m-4 flex justify-center">
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
