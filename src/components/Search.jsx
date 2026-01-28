import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-wrapper">
      <SearchIcon className="search-icon-inside" size={18} />
      <input
        type="text"
        placeholder="Search movies, shows..."
        className="search-input-field"
        //controlled input: the UI is always in sync with the search filter logic.
        value={searchTerm}
        //Whenever the user types, state is updated in the parent(movie player)component.
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
  );
}

export default Search;
