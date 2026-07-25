import Text from './Text';

function Pagination({ currentPostIndex, lastPostIndex }) {
  return (
    <Text
      type="p"
      className="mbs-8 mbe-4 font-(family-name:--subtitle) text-[1.3rem] font-medium text-(--primary) sm:mbs-16 sm:text-[1.5rem]"
    >
      {currentPostIndex} of {lastPostIndex}
    </Text>
  );
}

export default Pagination;
