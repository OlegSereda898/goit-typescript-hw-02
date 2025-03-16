import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </form>
    </header>
  );
};

export default SearchBar;
