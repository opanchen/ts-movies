import { useState } from "react";
import css from "./SearchForm.module.css";

type Props = {
  onSubmit: (query: string) => void;
};

export const SearchForm: React.FC<Props> = ({ onSubmit }: Props) => {
  const [query, setQuery] = useState<string>("");

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim() === "") {
      return alert("Enter search query...");
    }

    onSubmit(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label>
        <input
          type="text"
          name={query}
          value={query}
          className={css.input}
          onChange={handleChangeQuery}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          placeholder="Enter query to search movies..."
        />
      </label>
      <button type="submit" className={css["submit-btn"]}>
        Search
      </button>
    </form>
  );
};
