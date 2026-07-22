function Pill({ tag, handleSearch }) {
  return (
    <li
      className="py-[0.3rem]"
      onClick={e => handleSearch(e.target.textContent)}
    >
      {tag}
    </li>
  );
}

export default Pill;
