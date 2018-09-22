import * as React from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { Link } from "react-router-dom";

interface Props {
  query: string;
  onInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default function SearchForm(props: Props) {
  return (
    <>
      <InputGroup className="app__input">
        <Input value={props.query} onChange={props.onInputChange} />
        <InputGroupAddon addonType="append">
          <Link to={`/?q=${props.query}`}>
            <Button color="primary" disabled={props.query === ""}>
              Search
            </Button>
          </Link>
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
