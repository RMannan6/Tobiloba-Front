import React, { useState } from "react";
import { Form, Button } from "antd";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        size="sm"
        type="text"
        name="q"
        column="sm"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="search products..."
        className="mr-sm-1 my-1 ml-sm-5 w-60 rounded-pill"
      ></Form.Control>
      <Button
        size="sm"
        type="submit"
        variant="outline-success"
        className="p-2 rounded-pill ml-sm-3"
      >
        search
      </Button>
    </Form>
  );
};

export default SearchBox;
