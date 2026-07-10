function Pagination({ currentPostIndex, lastPostIndex }) {
  return (
    <div className="pagination">
      <p>
        {currentPostIndex} of {lastPostIndex}
      </p>
    </div>
  );
}

export default Pagination;
