import { Link } from 'react-router';

function NavListItem({ children, isHome }) {
  return (
    <li className={`control-btn-wrapper ${isHome ? 'hide' : 'show'}`}>
      {children}
    </li>
  );
}

function NavButton({ label }) {
  return (
    <Link
      to="/"
      className="control-btn"
      onClick={() => console.log('clicked')}
      viewTransition
    >
      {label}
    </Link>
  );
}

function Logo() {
  return (
    <li className="logo">
      <Link to="/" viewTransition>
        purplemojito
      </Link>
    </li>
  );
}

function Header({ isHome }) {
  return (
    <header>
      <nav>
        <ul>
          <NavListItem isHome={isHome}>
            <NavButton label="prev"></NavButton>
          </NavListItem>

          <Logo />

          <NavListItem isHome={isHome}>
            <NavButton label="next"></NavButton>
          </NavListItem>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
