import * as React from "react";
import { Book } from "src/App";
import "./BookList.css";
import { Link } from "react-router-dom";

export default function BookList({ books }: { books: Book[] }) {
  return <ul className="book-list">{books.map(renderItem)}</ul>;
}

function renderItem(book: Book, idx: number) {
  return (
    <li key={idx} className="book-list__item book">
      {book.volumeInfo.imageLinks && (
        <img
          className="book__img"
          src={book.volumeInfo.imageLinks.smallThumbnail}
          alt={`${book.volumeInfo.title} image`}
        />
      )}
      <Link to={`/books/${book.id}`}>
        <p className="book__title">{book.volumeInfo.title}</p>
      </Link>
      <ul className="book__author">
        {book.volumeInfo.authors.constructor === Array &&
          book.volumeInfo.authors.map((author, idx) => (
            <li key={idx} className="book__author--list">
              {author}
            </li>
          ))}
      </ul>
      <p>{book.volumeInfo.publishedDate}</p>
    </li>
  );
}
