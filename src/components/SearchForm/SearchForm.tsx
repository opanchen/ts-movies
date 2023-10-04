import { useState } from "react";
import { useLangState } from "src/hooks";
import { toast } from "react-toastify";
import css from "./SearchForm.module.css";

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
      lang === "en-US"
        ? toast.warning("Enter search query...")
        : toast.warning("Введіть пошуковий запит...");
      return;
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
          pattern="^[a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ]+(([' -][a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ ])?[a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇ]*)*$"
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
