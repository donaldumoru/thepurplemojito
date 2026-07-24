import Text from './Text';

function Pagination({ currentPostIndex, lastPostIndex }) {
  return (
    <div className="mbs-8 mbe-4 sm:mbs-16">
      <Text
        type="p"
        className="font-(family-name:--subtitle) text-[1.3rem] font-medium text-(--primary) sm:text-[1.5rem]"
      >
        {currentPostIndex} of {lastPostIndex}
      </Text>
    </div>
  );
}

export default Pagination;
