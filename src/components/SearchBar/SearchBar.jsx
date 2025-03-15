import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    onSubmit(input);
    setInput("");
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.button} type="submit">
          <HiMiniMagnifyingGlass />
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </header>
  );
}

export default SearchBar;
