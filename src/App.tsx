import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Header from "./components/Header";


const queryClient = new QueryClient();

const App = () => {

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/books" />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
