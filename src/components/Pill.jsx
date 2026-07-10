function Pill({ tag, handleSearch }) {
  return (
    <li className="pill" onClick={e => handleSearch(e.target.textContent)}>
      {tag}
    </li>
  );
}

export default Pill;
