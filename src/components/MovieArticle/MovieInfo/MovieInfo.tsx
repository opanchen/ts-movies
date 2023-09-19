import css from "./MovieInfo.module.css";

export const MovieInfo: React.FC = () => {
  return (
    <div className={css.info}>
      <h1 className={css.title}>Title</h1>
      <p className={css.year}>2023</p>
      <p className={css.descr}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
        repellendus debitis eum eos nemo esse omnis inventore, at molestias nam.
        Accusantium cum ratione deserunt aut est ipsum eligendi, odio delectus
        possimus natus nobis, quo perferendis, ut sit mollitia soluta facilis
        illum amet ullam. Voluptas dolorem aut molestias quaerat? Accusamus,
        dolore!
      </p>
    </div>
  );
};
