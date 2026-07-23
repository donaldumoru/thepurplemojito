function Pill({ tag, handleSearch }) {
  return (
    <li
      className="cursor-pointer px-4 py-[0.3rem] text-[0.8rem] text-(--primary) capitalize outline-1 outline-(--primary)"
      onClick={e => handleSearch(e.target.textContent)}
    >
      {tag}
    </li>
  );
}

export default Pill;
