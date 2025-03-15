import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Loader from "./components/Loader/Loader.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import toast from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root");

const API_KEY = "FzTw7o7g-lIH89gtZyTHJ2gsz4kB8DTXhwagcyxFGYY";
const BASE_URL = "https://api.unsplash.com/search/photos";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = async (searchQuery, pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: searchQuery,
          page: pageNum,
          per_page: 12,
          client_id: API_KEY,
        },
      });
      setImages((prev) =>
        pageNum === 1
          ? response.data.results
          : [...prev, ...response.data.results]
      );
    } catch (err) {
      console.error("Error:", err);
      setError("Error loading images");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    if (!newQuery.trim()) {
      toast.error("Enter a search query");
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={setModalImage} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}
      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </div>
  );
}

export default App;
