import React from "react";
import { Link, useLocation } from "react-router-dom";

export interface Author {
  name: string;
  birth_year?: number;
  death_year?: number;
}

export interface Book {
  id: number;
  title: string;
  authors: Author[];
  download_count: number;
  subjects: string[];
  bookshelves: string[];
}

interface BookCardProps {
  book: Book;
  onDetailsClick?: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const location = useLocation();

  const isHomeRoute = location.pathname === "/books";

  return (
    <Link key={book.id} to={`/books/${book.id}`}>
      <div className={isHomeRoute ? "book" : "details-card"}>
        <div className="book-info">
          <h1>
            <strong>{book.title}</strong>
          </h1>
          <h2>
            Id: {book.id} - Authors:{" "}
            {book.authors.map((author) => author.name).join(", ")} -{" "}
            {book.download_count} downloads
          </h2>
          {!isHomeRoute && (
            <h2>
              <strong>Subjects:</strong> {book.subjects.join(", ")} <br />
            </h2>
          )}
          {!isHomeRoute && (
            <h2>
              <strong>Bookshelves:</strong> {book.bookshelves.join(", ")} <br />
            </h2>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
