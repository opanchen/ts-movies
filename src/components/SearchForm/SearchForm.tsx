import { useState } from "react";
import css from "./SearchForm.module.css";
import { useLangState } from "src/hooks";

type Props = {
  onSubmit: (query: string) => void;
};

export const SearchForm: React.FC<Props> = ({ onSubmit }: Props) => {
  const [query, setQuery] = useState<string>("");
  const { lang } = useLangState();

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

  const placeholderText: string =
    lang === "en-US"
      ? "Enter query to search movies..."
      : "Введіть запит для пошуку...";

  const inputTitle: string =
    lang === "en-US"
      ? "Name may contain only letters, apostrophe, dash and spaces."
      : "Назва може містити лише літери, апостроф, тире та пробіли.";

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
          title={inputTitle}
          placeholder={placeholderText}
        />
      </label>
      <button type="submit" className={css["submit-btn"]}>
        {lang === "en-US" ? "Search" : "Пошук"}
      </button>
    </form>
  );
};
