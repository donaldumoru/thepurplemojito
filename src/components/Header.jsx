function NavListItem({ children }) {
  return <li>{children}</li>;
}

function NavButton({ label }) {
  return <button>{label}</button>;
}

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li className="control-btn-wrapper hide">
            <button className="control-btn">prev</button>
          </li>
          <li className="logo">
            <a href="">
              <span className="i">i</span>
              <span className="i">i</span>iiii
            </a>
          </li>

          <li className="control-btn-wrapper hide">
            <button className="control-btn">next</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
