import { Link } from 'react-router';

function NavListItem({ children, isHome, path }) {
  return (
    <li
      className={`control-btn-wrapper ${isHome ? 'hide' : 'show'} ${!path ? 'disabled-link' : ''}`}
    >
      {children}
    </li>
  );
}

function NavButton({ label, path }) {
  return (
    <Link
      to={path}
      className={`control-btn ${!path ? 'disabled-btn' : ''}`}
      viewTransition
      onClick={() => {
        document.documentElement.classList.remove('forward', 'backward');

        label === 'prev'
          ? document.documentElement.classList.add('backward')
          : document.documentElement.classList.add('forward');
      }}
    >
      {label}
    </Link>
  );
}

function Logo() {
  return (
    <li className="logo">
      <Link
        to="/"
        viewTransition
        onClick={() => {
          document.documentElement.classList.remove('forward', 'backward');
          document.documentElement.classList.add('backward');
        }}
      >
        TPM
      </Link>
    </li>
  );
}

function Header({ isHome, nextPath, prevPath }) {
  return (
    <header>
      <nav>
        <ul>
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
