import React from "react";
import App from "./App";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import booksList from "./data/booksList";

import "@testing-library/jest-dom/extend-expect";

const renderApp = () => render(<App />);

const TEST_IDS = {
  searchBox: "search",
  book: "book-list",
  noResults: "no-results",
  sortAsc: "sort-asc",
  sortDesc: "sort-desc",
};

const renderList = (list) => {
  for (let i = 0; i < list.length; i++) {
    const bookName = book.children[i].children[0];
    const bookAuthor = book.children[i].children[1];
    const bookGenre = book.children[i].children[2];
    const bookRating = book.children[i].children[3];

    expect(bookName).toHaveTextContent(list[i].book_name);
    expect(bookAuthor).toHaveTextContent(list[i].author);
    expect(bookGenre).toHaveTextContent(list[i].genre);
    expect(bookRating).toHaveTextContent(list[i].rating);
  }
};

let getByTestId;
let searchBox;
let book;
let sortAsc;
let sortDesc;

const sortAToZ = booksList => {
  const list =  [...booksList].sort((a, b) =>
  a.book_name > b.book_name ? 1 : -1
  ); 
  return list;
}
const sortZToA = booksList => {
  const list = [...booksList].sort((a, b) =>
  a.book_name > b.book_name ? -1 : 1
  );
  return list;
}

beforeEach(() => {
  const app = render(<App />);
  getByTestId = app.getByTestId;
  searchBox = getByTestId(TEST_IDS.searchBox);
  book = getByTestId(TEST_IDS.book);
  sortAsc = getByTestId(TEST_IDS.sortAsc);
  sortDesc = getByTestId(TEST_IDS.sortDesc);
});

afterEach(() => {
  cleanup();
});

describe("Initial rendering", () => {
  it("Should display description of 20 books", () => {
    expect(book.children).toHaveLength(booksList.length);
    renderList(booksList);
  });
});

describe("Functionality of search box", () => {
  it("Type of text in the Search box should be text", () => {
    expect(searchBox).toHaveAttribute("type", "text");
  });

  it("Should search after every 2 character input", () => {
    fireEvent.change(searchBox, { target: { value: "s" } });
    renderList(booksList);

    fireEvent.change(searchBox, { target: { value: "ic" } });
    const icList = [
      {
        author: "Ernest Hemingway",
        book_name: "The Old Man and the Sea",
        genre: "Classics",
        rating: 3.72,
      },
      {
        author: "F. Scott Fitzgerald",
        book_name: "The Great Gatsby",
        genre: "Classics",
        rating: 3.88,
      },
      {
        author: "Ken Follett",
        book_name: "The Pillars of the Earth",
        genre: "Historical Fiction",
        rating: 4.29,
      },
      {
        author: "Louisa May Alcott",
        book_name: "Little Women",
        genre: "Classics",
        rating: 4.03,
      },
      {
        author: "Kathryn Stockett",
        book_name: "The Help",
        genre: "Fiction",
        rating: 4.45,
      },
      {
        author: "Herman Melville",
        book_name: "Moby-Dick; or, The Whale",
        genre: "Classics",
        rating: 3.45,
      },
      {
        author: "Dan Brown",
        book_name: "The Da Vinci Code",
        genre: "Fiction",
        rating: 3.78,
      },
      {
        author: "Markus Zusak",
        book_name: "The Book Thief",
        genre: "Historical Fiction",
        rating: 4.36,
      },
      {
        author: "John Steinbeck",
        book_name: "Of Mice and Men",
        genre: "Classics",
        rating: 3.83,
      },
      {
        author: "Anthony Burgess",
        book_name: "A Clockwork Orange",
        genre: "Science Fiction",
        rating: 3.97,
      },
      {
        author: "Fyodor Dostoyevsky",
        book_name: "The Brothers Karamazov",
        genre: "Classics",
        rating: 4.3,
      },
      {
        author: "Joseph Heller",
        book_name: "Catch-22",
        genre: "Classics",
        rating: 3.97,
      },
      {
        author: "Antoine de Saint-Exupéry",
        book_name: "The Little Prince",
        genre: "Classics",
        rating: 4.28,
      },
      {
        author: "Mark Twain",
        book_name: "The Adventures of Huckleberry Finn",
        genre: "Fiction",
        rating: 3.8,
      },
    ];
    renderList(icList);

    fireEvent.change(searchBox, { target: { value: "ict" } });
    renderList(icList);

    fireEvent.change(searchBox, { target: { value: "icti" } });
    renderList([
      {
        author: "Ken Follett",
        book_name: "The Pillars of the Earth",
        genre: "Historical Fiction",
        rating: 4.29,
      },
      {
        author: "Kathryn Stockett",
        book_name: "The Help",
        genre: "Fiction",
        rating: 4.45,
      },
      {
        author: "Dan Brown",
        book_name: "The Da Vinci Code",
        genre: "Fiction",
        rating: 3.78,
      },
      {
        author: "Markus Zusak",
        book_name: "The Book Thief",
        genre: "Historical Fiction",
        rating: 4.36,
      },
      {
        author: "Anthony Burgess",
        book_name: "A Clockwork Orange",
        genre: "Science Fiction",
        rating: 3.97,
      },
      {
        author: "Mark Twain",
        book_name: "The Adventures of Huckleberry Finn",
        genre: "Fiction",
        rating: 3.8,
      },
    ]);
  });

  it("Should display correct results in both upper and lower case search", () => {
    fireEvent.change(searchBox, { target: { value: "ICtI" } });
    renderList([
      {
        author: "Ken Follett",
        book_name: "The Pillars of the Earth",
        genre: "Historical Fiction",
        rating: 4.29,
      },
      {
        author: "Kathryn Stockett",
        book_name: "The Help",
        genre: "Fiction",
        rating: 4.45,
      },
      {
        author: "Dan Brown",
        book_name: "The Da Vinci Code",
        genre: "Fiction",
        rating: 3.78,
      },
      {
        author: "Markus Zusak",
        book_name: "The Book Thief",
        genre: "Historical Fiction",
        rating: 4.36,
      },
      {
        author: "Anthony Burgess",
        book_name: "A Clockwork Orange",
        genre: "Science Fiction",
        rating: 3.97,
      },
      {
        author: "Mark Twain",
        book_name: "The Adventures of Huckleberry Finn",
        genre: "Fiction",
        rating: 3.8,
      },
    ]);
  });

  it("should show all contents on resetting the typed fields", () => {
    fireEvent.change(searchBox, { target: { value: "ic" } });
    fireEvent.change(searchBox, { target: { value: "ict" } });
    fireEvent.change(searchBox, { target: { value: "icti" } });
    fireEvent.change(searchBox, { target: { value: "" } });
    renderList(booksList);
  });

  it("Should display a message when no results found for a search", () => {
    fireEvent.change(searchBox, { target: { value: "ab" } });
    expect(book.children).toHaveLength(1);
    expect(screen.getByTestId("no-results")).toBeInTheDocument();
  });
});

describe("Functions of buttons", () => {
  it("Sort A to Z should sort the initial data in ascending order of the book name", () => {
    fireEvent.click(sortAsc);
    renderList(sortAToZ(booksList));
  });

  it("Sort A to Z should sort the current data being displayed after filtering in ascending order of the book name ", () => {
    fireEvent.change(searchBox, { target: { value: "icti" } });
    fireEvent.click(sortAsc);
    const tempList = [
      {
        author: "Ken Follett",
        book_name: "The Pillars of the Earth",
        genre: "Historical Fiction",
        rating: 4.29,
      },
      {
        author: "Kathryn Stockett",
        book_name: "The Help",
        genre: "Fiction",
        rating: 4.45,
      },
      {
        author: "Dan Brown",
        book_name: "The Da Vinci Code",
        genre: "Fiction",
        rating: 3.78,
      },
      {
        author: "Markus Zusak",
        book_name: "The Book Thief",
        genre: "Historical Fiction",
        rating: 4.36,
      },
      {
        author: "Anthony Burgess",
        book_name: "A Clockwork Orange",
        genre: "Science Fiction",
        rating: 3.97,
      },
      {
        author: "Mark Twain",
        book_name: "The Adventures of Huckleberry Finn",
        genre: "Fiction",
        rating: 3.8,
      },
    ]
    renderList(sortAToZ(tempList));
  })

  it("Sort Z to A should sort the current data being displayed after filtering in descending order of the book name ", () => {
    fireEvent.change(searchBox, { target: { value: "icti" } });
    fireEvent.click(sortDesc);
    const tempList = [
      {
        author: "Ken Follett",
        book_name: "The Pillars of the Earth",
        genre: "Historical Fiction",
        rating: 4.29,
      },
      {
        author: "Kathryn Stockett",
        book_name: "The Help",
        genre: "Fiction",
        rating: 4.45,
      },
      {
        author: "Dan Brown",
        book_name: "The Da Vinci Code",
        genre: "Fiction",
        rating: 3.78,
      },
      {
        author: "Markus Zusak",
        book_name: "The Book Thief",
        genre: "Historical Fiction",
        rating: 4.36,
      },
      {
        author: "Anthony Burgess",
        book_name: "A Clockwork Orange",
        genre: "Science Fiction",
        rating: 3.97,
      },
      {
        author: "Mark Twain",
        book_name: "The Adventures of Huckleberry Finn",
        genre: "Fiction",
        rating: 3.8,
      },
    ]
    renderList(sortZToA(tempList));
  })

  it("Sort A to Z should sort the initial data in ascending order of the book name", () => {
    fireEvent.click(sortDesc);
    renderList(sortZToA(booksList));
  });

});
