import * as React from "react";
import { match } from "react-router-dom";
import { URL } from "../App";
import { Book } from "../App";
import "./BookDetails.css";

interface Props {
  match: match<{ id: string }>;
}

interface State {
  bookDetails: Book | {};
}

export function isBook(book: Book | {}): book is Book {
  return (book as Book).id !== undefined;
}

export default class BookDetails extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getBookDetails();
  }

  state = {
    bookDetails: {}
  };

  getBookDetails = (): void => {
    fetch(`${URL}\\${this.props.match.params.id}`)
      .then(res => res.json())
      .then(json => this.setState({ bookDetails: json }));
  };

  render() {
    const book = this.state.bookDetails;
    if (isBook(book)) {
      return (
        <div className="details">
          <header className="details__title">{book.volumeInfo.title}</header>
          <p className="details__description">{book.volumeInfo.description}</p>
          <ul className="details__list detail-list">
            <li className="detail-list__page">
              page count: {book.volumeInfo.pageCount}
            </li>
            <li className="detail-list__lang">
              language: {book.volumeInfo.language}
            </li>
            {book.saleInfo["retail Price"] && (
              <li className="detail-list__price">
                price: {book.saleInfo["retail Price"].amount}
                <span>{book.saleInfo["retail Price"].currencyCode}</span>
              </li>
            )}
          </ul>
          <a className="details__infoLink" href={book.volumeInfo.infoLink}>
            Information
          </a>
          <a className="details__buyLink" href={book.saleInfo.buyLink}>
            Buy Book
          </a>
        </div>
      );
    }
    return null;
  }
}
