import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import fetchBookList from "../fetchBookList";
import useDebounce from "../hooks/useDebounce";
import BookCard, { Book } from "./BookCard";
import BookSearch from "./BookSearch";
import Button from "./Button";

interface QueryResult {
    count: number;
    previous: string | null;
    next: string | null;
    results: Book[];
}

const BookList: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const [pageNumber, setPageNumber] = useState(parseInt(searchParams.get("page") || "1", 10));

    useEffect(() => {
        setSearchParams({ search: searchTerm, page: pageNumber.toString() });
    }, [searchTerm, pageNumber, setSearchParams]);

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        setPageNumber(1);
    };

    const {
        data: booksData,
        isLoading: booksLoading,
        error: booksError,
    } = useQuery<QueryResult, Error>({
        queryKey: ["books", pageNumber, debouncedSearchTerm],
        queryFn: () => fetchBookList({ queryKey: [pageNumber, debouncedSearchTerm] }),
        keepPreviousData: true,
    });

    return (
        <>
            <BookSearch searchTerm={searchTerm} onSearchTermChange={handleSearch} />
            {booksLoading ? (
                <div className="loading-pane">
                    <img src="../../public/loading.png" className="loader" />
                </div>
            ) : (
                <div className="booklist-container">
                    {booksData?.results.map((book: Book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onDetailsClick={() => navigate(`/books/${book.id}`)}
                        />
                    ))}
                </div>
            )}

            <div className="pagination-container">
                {booksData && (
                    <>
                        <Button
                            onClick={() => setPageNumber(old => Math.max(old - 1, 1))}
                            disabled={pageNumber === 1}
                            className="button"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="icon-arrow" />
                            Previous
                        </Button>
                        <Button
                            onClick={() => setPageNumber(old => (!booksData || !booksData.next ? old : old + 1))}
                            disabled={!booksData || !booksData.next}
                            className="button"
                        >
                            Next
                            <FontAwesomeIcon icon={faArrowRight} className="icon-arrow" />
                        </Button>
                    </>
                )}
            </div>

            {booksError && (
                <div className="error">
                    <p>Error fetching books: {booksError.message}</p>
                </div>
            )}
        </>
    );
};

export default BookList;
