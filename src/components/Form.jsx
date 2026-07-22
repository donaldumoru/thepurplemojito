import { GoX } from 'react-icons/go';

function SearchBar({ searchQuery, handleSearch }) {
  return (
    <form
      className="relative mbe-8 flex h-14 items-center sm:h-20"
      onSubmit={e => e.preventDefault()}
    >
      <input
        id="search-input"
        type="text"
        className="caret-dark-shade border-dark-shade placeholder:text-dark-shade text-primary size-full border-b-[1.5px] bg-inherit text-[1.1rem] font-light tracking-widest focus:outline-none sm:text-[2rem]"
        placeholder="Looking for a story ?"
        value={searchQuery}
        onChange={e => handleSearch(e.target.value)}
      />

      <div onClick={() => handleSearch('')}>
        <GoX className="fill-dark-shade absolute right-2.5 bottom-0 aspect-square h-full w-5 cursor-pointer sm:w-8.75" />
      </div>
    </form>
  );
}

export default SearchBar;
