import { useEffect, useRef } from 'react';
import { GoX } from 'react-icons/go';

function SearchBar({ searchQuery, handleSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, []);

  return (
    <form
      className="relative mbe-8 flex h-14 items-center sm:h-20"
      onSubmit={e => e.preventDefault()}
    >
      <input
        ref={inputRef}
        id="search-input"
        type="text"
        className="size-full border-b-[1.5px] border-(--dark-shade) bg-inherit text-[1.1rem] font-light tracking-widest text-(--primary) caret-(--dark-shade) placeholder:text-(--dark-shade) focus:outline-none md:text-[1.5rem] lg:text-[1.8rem] dark:border-(--dark-primary) dark:text-(--dark-primary) dark:placeholder:text-(--dark-primary)"
        placeholder="Looking for a story ?"
        value={searchQuery}
        onChange={e => handleSearch(e.target.value)}
      />

      <div onClick={() => handleSearch('')}>
        <GoX className="absolute right-2.5 bottom-0 aspect-square h-full w-5 cursor-pointer fill-(--dark-shade) sm:w-6 lg:w-7 dark:fill-(--dark-primary)" />
      </div>
    </form>
  );
}

export default SearchBar;
