import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { ImageType, AppState } from "./App.types";
import "./App.css";

Modal.setAppElement("#root");

const API_KEY: string = "FzTw7o7g-lIH89gtZyTHJ2gsz4kB8DTXhwagcyxFGYY";
const BASE_URL: string = "https://api.unsplash.com/search/photos";

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const savedState = localStorage.getItem("imageSearchState");
    return savedState
      ? JSON.parse(savedState)
      : {
          query: "",
          images: [],
          page: 1,
          loading: false,
          error: null,
          modalImage: null,
        };
  });

  useEffect(() => {
    if (!state.query) return;
    fetchImages(state.query, state.page);
  }, [state.query, state.page]);

  useEffect(() => {
    if (state.query) {
      localStorage.setItem("imageSearchState", JSON.stringify(state));
    }
  }, [state]);

  const fetchImages = async (
    searchQuery: string,
    pageNum: number
  ): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await axios.get<{ results: ImageType[] }>(BASE_URL, {
        params: {
          query: searchQuery,
          page: pageNum,
          per_page: 12,
          client_id: API_KEY,
        },
      });
      setState((prev) => ({
        ...prev,
        images:
          pageNum === 1
            ? response.data.results
            : [...prev.images, ...response.data.results],
      }));
    } catch (err) {
      console.error("Error:", err);
      setState((prev) => ({ ...prev, error: "Error loading images" }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleSearch = (newQuery: string): void => {
    if (!newQuery.trim()) {
      toast.error("Enter a search query");
      return;
    }
    setState({
      query: newQuery,
      images: [],
      page: 1,
      loading: false,
      error: null,
      modalImage: null,
    });
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {state.error && <ErrorMessage message={state.error} />}
      <ImageGallery
        images={state.images}
        onImageClick={(image: ImageType) =>
          setState((prev) => ({ ...prev, modalImage: image }))
        }
      />
      {state.loading && <Loader />}
      {state.images.length > 0 && !state.loading && (
        <LoadMoreBtn
          onClick={() => setState((prev) => ({ ...prev, page: prev.page + 1 }))}
        />
      )}
      {state.modalImage && (
        <ImageModal
          image={state.modalImage}
          onClose={() => setState((prev) => ({ ...prev, modalImage: null }))}
        />
      )}
    </div>
  );
};

export default App;
