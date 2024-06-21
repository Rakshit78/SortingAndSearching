import React from 'react';
function Books({ booksList }) {
  return (
    <>
      <div
        className='layout-row wrap w-100 justify-content-center'
        data-testid='book-list'
      >
        {booksList.map((res) => {
          return (
            <div className='card layout-column w-20 ma-10 px-8' key={res.id}>
              <h5 className='my-2'>Name: {res.book_name}</h5>
              <h5 className='my-2'>Author: {res.author}</h5>
              <h5 className='my-2'>Genre: {res.genre}</h5>
              <h5 className='my-2'>
                Rating: {res.rating} <span>⭐️</span>
              </h5>
            </div>
          );
        })}
        {booksList.length <= 0 && (
          <div style={{ color: 'red' }} data-testid='no-results'>
            No Results found!
          </div>
        )}
      </div>
    </>
  );
}

export default Books;
