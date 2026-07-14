import Text from './Text';

function Pagination({ currentPostIndex, lastPostIndex }) {
  return (
    <div className="pagination">
      <Text type="p">
        {currentPostIndex} of {lastPostIndex}
      </Text>
    </div>
  );
}

export default Pagination;
