function Pill({ tag, handler }) {
  return (
    <li
      className="w-fit cursor-pointer list-none px-4 py-[0.3rem] text-[0.8rem] text-(--primary) capitalize outline-1 outline-(--primary) select-none"
      onClick={e => handler(e.target.textContent)}
    >
      {tag}
    </li>
  );
}

export default Pill;
