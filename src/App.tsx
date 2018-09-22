import * as React from "react";
import "./App.css";
import BookList from "./components/BookList";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import BookDetails from "./components/BookDetails";

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

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Link to="/">
          <h1 className="app__header">Google-Books</h1>
        </Link>
        <Switch>
          <Route path="/books/:id" component={BookDetails} />
          <Route path="/" component={BookList} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
