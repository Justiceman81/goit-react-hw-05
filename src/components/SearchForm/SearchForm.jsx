import { FiSearch } from "react-icons/fi";
import styles from "./SearchForm.module.css";
import { useState } from "react";
import clsx from "clsx";

const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <form className={clsx(styles.searchForm)} onSubmit={handleSubmit}>
      <input
        className={clsx(styles.searchInput)}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a movie..."
        required
      />
      <button className={clsx(styles.searchButton)} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
};

export default SearchForm;
