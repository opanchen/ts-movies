import css from "./Container.module.css";

type Props = {
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ children }: Props) => {
  return <div className={css.container}>{children}</div>;
};
