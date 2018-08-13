import * as React from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import "./App.css";
import BookList from "./components/BookList";

interface State {
  query: string;
  books: Book[];
}

export interface Book {
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      smallThumbnail: string;
    };
    publishedDate: string;
  };
}

const URL = `https://www.googleapis.com/books/v1/volumes?q=`;

class App extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
  }

  state = {
    query: "",
    books: []
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ query: event.target.value });

  search = (event: React.SyntheticEvent<HTMLElement>) => {
    if (this.state.query !== "") {
      fetch(`${URL}${this.state.query}`)
        .then(res => res.json())
        .then(json => this.setState({ books: json.items }))
        .catch(err => console.log(err));
      console.log("this.state", this.state);
    }
  };

  render() {
    return (
      <div className="app">
        <h1 className="app__header">Google-Books</h1>
        <InputGroup className="app__input">
          <Input value={this.state.query} onChange={this.onInputChange} />
          <InputGroupAddon addonType="append" onKeyPress={this.search}>
            <Button color="primary" onClick={this.search}>
              Search
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <BookList books={this.state.books} />
      </div>
    );
  }
}

export default App;
