import { Component, ErrorInfo } from "react";
import { Container, FallbackView } from "../";
import { getLang } from "src/helpers";
import css from "./ErrorBoundary.module.css";

interface IProps {
  children: React.ReactNode;
}

interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  errorMessage =
    getLang() === "en-US" ? "Something went wrong." : "Щось пішло не так.";

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Display fallback UI
    console.log("ErrorBoundary caught an error: ", error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Container>
            <div className={css.wrapper}>
              <FallbackView type="error" message={this.errorMessage} />
              <a className={css.link} href="/ts-movies/">
                {getLang() === "en-US" ? "Reload" : "Перезавантажити"}
              </a>
            </div>
          </Container>
        </>
      );
    }

    return this.props.children;
  }
}
