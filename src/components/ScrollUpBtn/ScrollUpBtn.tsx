import { useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import css from "./ScrollUpBtn.module.css";

export const ScrollUpBtn: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled > 300 ? setVisible(true) : setVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button
      className={css.button}
      type="button"
      onClick={scrollToTop}
      style={{ display: visible ? "flex" : "none" }}
      aria-label="Scroll to top"
    >
      <BsArrowUpCircle size={24} />
    </button>
  );
};
