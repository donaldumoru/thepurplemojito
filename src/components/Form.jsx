import { IoIosSearch } from 'react-icons/io';

function SearchBar({ searchQuery, handleSearch }) {
  return (
    <form className="search">
      <input
        id="search-input"
        type="text"
        className="search__field"
        placeholder="looking for a story ?"
        value={searchQuery}
        onChange={e => handleSearch(e.target.value)}
      />

      <IoIosSearch />
    </form>
  );
}

export default SearchBar;
