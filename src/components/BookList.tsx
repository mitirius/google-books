import * as React from "react";
import { Book } from "src/App";
import "./BookList.css";
import { Link } from "react-router-dom";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

interface Props {
  books: Book[];
  query: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: (event: React.SyntheticEvent<HTMLElement>) => void;
}

export default function BookList(props: Props) {
  return;
  <>
    <InputGroup className="app__input">
      <Input value={props.query} onChange={props.onInputChange} />
      <InputGroupAddon addonType="append">
        <Button
          color="primary"
          onClick={props.search}
          disabled={props.query === ""}
        >
          Search
        </Button>
      </InputGroupAddon>
    </InputGroup>
    <ul className="book-list">{props.books.map(renderItem)}</ul>;
  </>;
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
