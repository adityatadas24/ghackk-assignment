import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
  
    <div className="row justify-content-center my-4">
     
        <input
        className="col-md-6 col-12"
         type="text"
         value={query}
         onChange={handleSearch}
         placeholder="Search by Client ID or Name"
        />
   
   
    </div>
  );
};

export default SearchBar;
