import { Book } from "src/App";

//Actions
const LOAD: 'app/books/load' = 'app/books/load';

export interface BookList {
    query: string;
    books: Book[];
}


const initialState = {
    query: "",
    books: [],
};

type Action = LoadAction;

//Reducer
export default function bookList (state: BookList = initialState, action: Action): BookList {
    switch(action.type) {
        case LOAD:
        return state;
        default:
        return state;
    }
}

//Action Creators
interface LoadAction { type: typeof LOAD, payload: string}
export function loadBooks(query: string): LoadAction {
    return { type: LOAD, payload: query };
}