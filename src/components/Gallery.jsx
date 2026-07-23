function Gallery({ children }) {
  return (
    <ul className="mb-16 grid w-full grid-cols-2 gap-1.25 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {children}
    </ul>
  );
}

export default Gallery;
