import * as React from "react";
import { Book } from "src/App";
import "./BookList.css";

export default function BookList({ books }: { books: Book[] }) {
  return <ul className="book-list">{books.map(renderItem)}</ul>;
}

function renderItem(book: Book, idx: number) {
  return (
    <li key={idx} className="book-list__item book">
      {/* <img
        src={book.volumeInfo.imageLinks.smallThumbnail}
        alt={`${book.volumeInfo.title} image`}
      /> */}
      <p className="book__title">{book.volumeInfo.title}</p>
      <ul className="book__author">
        {book.volumeInfo.authors.map((author, idx) => (
          <li key={idx} className="book__author--list">
            {author}
          </li>
        ))}
      </ul>
      <p>{book.volumeInfo.publishedDate}</p>
    </li>
  );
}
