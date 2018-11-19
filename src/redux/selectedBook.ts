import { URL } from "../App";

//Actions
const LOAD: "app/selectedBook/load" = "app/selectedBook/load";

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

const initialState = {};

type Action = LoadAction;

//Reducer
type State = Book | {};

export default function selectedBook(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case LOAD:
      return state;
    default:
      return state;
  }
}

//Action Creators
export interface LoadAction {
  type: typeof LOAD;
  payload: Promise<Book[]>;
  status: string;
}
export function getBookDetails(id: string): LoadAction {
  return {
    type: LOAD,
    payload: fetch(`${URL}\\${id}`).then(res => res.json()),
    status: "pending"
  };
}
