import * as React from "react";
import { match } from "react-router-dom";
import { Book } from "../App";
import "./BookDetails.css";
import { connect } from "react-redux";
import { LoadAction, getBookDetails } from "../redux/selectedBook";

interface Props {
  match: match<{ id: string }>;
  bookDetails: Book;
  getBookDetails: (id: string) => LoadAction;
}

export function isBook(book: Book | {}): book is Book {
  return (book as Book).id !== undefined;
}

class BookDetails extends React.PureComponent<Props> {
  componentDidUpdate() {
    this.props.getBookDetails(this.props.match.params.id);
  }

  render() {
    const book = this.props.bookDetails;
    if (isBook(book)) {
      return (
        <div className="details">
          <header className="details__title">{book.volumeInfo.title}</header>
          {book.volumeInfo.imageLinks && (
            <img
              className="details__img"
              src={book.volumeInfo.imageLinks.smallThumbnail}
              alt={`${book.volumeInfo.title} image`}
            />
          )}
          <p className="details__description">{book.volumeInfo.description}</p>
          <ul className="details__list detail-list">
            <li className="detail-list__page">
              page count: {book.volumeInfo.pageCount}
            </li>
            <li className="detail-list__lang">
              language:{" "}
              <span className="detail-list__lang-val">
                {book.volumeInfo.language}
              </span>
            </li>
            {book.saleInfo.retailPrice && (
              <li className="detail-list__price">
                price:{" "}
                {`${book.saleInfo.retailPrice.amount} ${
                  book.saleInfo.retailPrice.currencyCode
                }`}
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

export default connect(
  function({ selectedBook }: { selectedBook: Book }) {
    return { bookDetails: selectedBook };
  },
  { getBookDetails }
)(BookDetails);
