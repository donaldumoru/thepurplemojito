import { IoIosSearch } from 'react-icons/io';

function SearchBar() {
  return (
    <form className="search">
      <input
        id="search-input"
        type="text"
        className="search__field"
        placeholder="looking for a story ?"
      />

      <IoIosSearch />
    </form>
  );
}

export default SearchBar;
