import * as React from "react";
import { Book, URL } from "src/App";
import "./BookList.css";
import { Link } from "react-router-dom";
import * as queryString from "query-string";
import SearchForm from "./SearchForm";
import InfoMsg from "src/components/InfoMsg";

interface Props {
  location: { search: string };
}

interface State {
  query: string;
  books: Book[];
}

export default class BookList extends React.PureComponent<Props, State> {
  state = {
    query: "",
    books: []
  };

  isSearchBtnClicked = false;

  renderBookList = (): React.ReactElement<any> =>
    this.isSearchBtnClicked && this.state.books.length === 0 ? (
      <InfoMsg />
    ) : (
      <BookList location={{ search: "" }} />
    );

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  search = () => {
    const searchTerm = queryString.parse(this.props.location.search);
    fetch(`${URL}?q=${searchTerm.q}`)
      .then(res => res.json())
      .then(
        json =>
          json.items
            ? this.setState({ books: json.items })
            : this.setState({ books: [] })
      )
      .catch(console.log);
  };

  componentDidMount() {
    if (this.props.location.search !== "") {
      const query = queryString.parse(this.props.location.search);
      this.setState({ query: query.q });
      this.search();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.location.search !== this.props.location.search) {
      this.search();
    }
  }

  render() {
    return (
      <>
        <SearchForm
          query={this.state.query}
          onInputChange={this.onInputChange}
        />
        <ul className="book-list">{this.state.books.map(renderItem)}</ul>
      </>
    );
  }
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
        {!!book.volumeInfo.authors &&
          book.volumeInfo.authors.constructor === Array &&
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
