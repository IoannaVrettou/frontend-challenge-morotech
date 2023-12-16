import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BookSearchProps {
  searchTerm: string;
  onSearchTermChange: (newSearchTerm: string) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({
  searchTerm,
  onSearchTermChange,
}) => {
  return (
    <div className="search-container">
      <div className="search-area">
        <h2>Find your Book</h2>
        <div className="search">
          <input
            type="search"
            placeholder="Enter your book"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
          />

          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </div>
      </div>

      <div className="quote">
        <h1>
          There is no friend as loyal
          <br /> as a book.
        </h1>
      </div>
    </div>
  );
};

export default BookSearch;
