import { useParams, useNavigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import BookCard from "./BookCard";
import Button from "./Button";
import fetchBook from "../fetchBook";



const BookDetails: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();


    const results = useQuery({
        queryKey: ["details", bookId],
        queryFn: fetchBook
    });

    if (results.isLoading) {
        return <div className="loading-pane"><img src='../../public/loading.png' className="loader" /></div>;
    }

    const book = results.data;

    if (results.isError) {
        return <div className="error">Sorry, there was an error during fetching book details</div>;
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log(urlSearchParams, 'urlSearchParams');
    const fromPage = Number(urlSearchParams.get("page")) || 1;
    console.log(fromPage, 'fromPage');

    return (
        <>
            <div className="details-container">
                <h3 className="book-details-header">Book Details</h3>
                <BookCard book={book} />
                <Button className="back-button" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faAngleLeft} className="icon-angle" />
                    Back
                </Button>
            </div>


        </>
    );
};

export default BookDetails;
