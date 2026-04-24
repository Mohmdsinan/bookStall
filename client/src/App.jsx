import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BooksProvider } from "./context/BooksContext";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import BookDetails from "./pages/BookDetails";
import ManageBooks from "./pages/ManageBooks";

function App() {
  return (
    <BrowserRouter>
      <BooksProvider>
        <div className="app-layout">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/manage" element={<ManageBooks />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BooksProvider>
    </BrowserRouter>
  );
}

export default App;
