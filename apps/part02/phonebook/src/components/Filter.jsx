import React from 'react';

export default function Filter({search, handleSearch}) {

  return (
   <div>
      <label htmlFor="search">Search: </label>
      <input name='search' placeholder='Search by name' value={search} onChange={handleSearch} />
   </div>
  );
}
