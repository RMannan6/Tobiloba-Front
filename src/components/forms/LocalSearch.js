import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div className="col-sm-2">
      <input
        type="text"
        className="form-control mb-4"
        placeholder="filter (e.g. apple)"
        value={keyword}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default LocalSearch;
