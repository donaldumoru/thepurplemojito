import Text from './Text';

function Pagination({ currentPostIndex, lastPostIndex }) {
  return (
    <div className="mbs-8 mbe-4">
      <Text
        type="p"
        className="text-[1.3rem] font-light text-(--primary) sm:text-[2rem]"
      >
        {currentPostIndex} of {lastPostIndex}
      </Text>
    </div>
  );
}

export default Pagination;
