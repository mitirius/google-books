import * as React from "react";
import "./App.css";
import BookList from "./components/BookList";
import InfoMsg from "./components/InfoMsg";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import BookDetails from "./components/BookDetails";

interface State {
  query: string;
  books: Book[];
}

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      smallThumbnail: string;
    };
    publishedDate: string;
    description: string;
    pageCount: number;
    language: string;
    infoLink: string;
  };
  saleInfo: {
    retailPrice: {
      amount: number;
      currencyCode: string;
    };
    buyLink: string;
  };
}

export const URL = `https://www.googleapis.com/books/v1/volumes`;

export default class App extends React.PureComponent<{}, State> {
  isSearchBtnClicked = false;

  state = {
    query: "",
    books: []
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  search = (event: React.SyntheticEvent<HTMLElement>) => {
    this.isSearchBtnClicked = true;
    if (this.state.query !== "") {
      fetch(`${URL}?q=${this.state.query}`)
        .then(res => res.json())
        .then(
          json =>
            json.items
              ? this.setState({ books: json.items })
              : this.setState({ books: [] })
        )
        .catch(console.log);
    }
  };

  renderBookList = (): React.ReactElement<any> =>
    this.isSearchBtnClicked && this.state.books.length === 0 ? (
      <InfoMsg />
    ) : (
      <BookList
        books={this.state.books}
        query={this.state.query}
        search={this.search}
        onChange={this.onInputChange}
      />
    );

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Link to="/">
            <h1 className="app__header">Google-Books</h1>
          </Link>
          <Switch>
            <Route path="/books/:id" component={BookDetails} />
            <Route path="/" render={this.renderBookList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
