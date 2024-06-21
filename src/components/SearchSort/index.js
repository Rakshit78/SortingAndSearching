import React, { useEffect, useState } from 'react';
import Books from '../Books';

function SearchSort({ booksList }) {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(booksList);
  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);
    if (value.length % 2 == 0) {
      const filData = booksList.filter((res) => {
        return res.genre.includes(value.trim());
      });
      setFilteredData(filData);
    } else if (value.length === 0) {
      setFilteredData(booksList);
    }
  };

  const hadleAceSort = () => {
    let arr = [...filteredData];
    arr.sort((a, b) => {
      if (a.book_name < b.book_name) {
        return -1;
      } else if (a.book_name > b.book_name) {
        return 1;
      } else {
        return 0;
      }
    });
    setFilteredData(arr);
  };

  const hadleDescSort = () => {
    let arr = [...filteredData];
    arr.sort((a, b) => {
      if (a.book_name > b.book_name) {
        return -1;
      } else if (a.book_name < b.book_name) {
        return 1;
      } else {
        return 0;
      }
    });
    setFilteredData(arr);
  };

  return (
    <>
      <div className='w-100 layout-row justify-content-center align-items-end pa-20'>
        <input
          className='large w-50'
          placeholder='Search for a book genre'
          data-testid='search'
          value={searchText}
          onChange={handleSearch}
        />
        <button
          className='my-0 h-4 mr-0'
          value='Sort A to Z'
          data-testid='sort-asc'
          onClick={() => hadleAceSort()}
        >
          Sort A to Z
        </button>
        <button
          className='my-0 h-4'
          value='Sort Z to A'
          data-testid='sort-desc'
          onClick={() => hadleDescSort()}
        >
          Sort Z to A
        </button>
      </div>
      <Books booksList={filteredData} />
    </>
  );
}

export default SearchSort;
