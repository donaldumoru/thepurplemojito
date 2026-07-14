import { GoX } from 'react-icons/go';

function SearchBar({ searchQuery, handleSearch }) {
  return (
    <form className="search" onSubmit={e => e.preventDefault()}>
      <input
        id="search-input"
        type="text"
        className="search__field"
        placeholder="Looking for a story ?"
        value={searchQuery}
        onChange={e => handleSearch(e.target.value)}
      />

      <div onClick={() => handleSearch('')}>
        <GoX />
      </div>
    </form>
  );
}

export default SearchBar;
