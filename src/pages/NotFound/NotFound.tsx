import { Container, FallbackView } from "src/components";
import { useLangState } from "src/hooks";
import { Helmet } from "react-helmet";
import css from "./NotFound.module.css";

const NotFound: React.FC = () => {
  const { lang } = useLangState();

  const errorMessage =
    lang === "en-US"
      ? "404. The page at this address doesn't exist. Please use the navigation bar above to continue using the application."
      : "404. Сторінки за даною адресою не існує. Будь ласка, використайте панель навігації у верхній частині інтерфейсу, щоб продовжити використання застосунку.";
  return (
    <>
      <Helmet>
        <title>
          {lang === "en-US" ? "404. Not Found" : "404. Не Знайдено"}
        </title>
      </Helmet>

      <div className={css.wrapper}>
        <Container>
          <FallbackView type="error" message={errorMessage} />
        </Container>
      </div>
    </>
  );
};

export default NotFound;
