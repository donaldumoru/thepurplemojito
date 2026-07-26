import Text from './Text';

function Pagination({ currentPostIndex, lastPostIndex }) {
  return (
    <Text
      type="p"
      className="mbe-4 font-(family-name:--subtitle) text-[1.3rem] font-medium text-(--primary) sm:mbs-8 sm:mbs-16 sm:text-[1.5rem] dark:text-(--dark-primary)"
    >
      {currentPostIndex} of {lastPostIndex}
    </Text>
  );
}

export default Pagination;
