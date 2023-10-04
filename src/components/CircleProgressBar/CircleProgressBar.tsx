import css from "./CircleProgressBar.module.css";

type Props = {
  circleWidth: number;
  vote: number;
};

export const CircleProgressBar: React.FC<Props> = ({
  circleWidth,
  vote,
}: Props) => {
  const percentage = vote * 10;
  const radius = circleWidth / 2.5;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  const rate: string = vote < 5 ? "low" : vote >= 7 ? "high" : "middle";
  const fontSize = circleWidth / 3;

  return (
    <div data-rate={rate} className={css.wrapper}>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
        className={css.icon}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="4px"
          r={radius}
          className={css["circle-background"]}
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="4px"
          r={radius}
          className={css["circle-progress"]}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className={css["circle-text"]}
          style={{ fontSize: fontSize }}
        >
          {vote !== 0 ? vote.toFixed(1) : 0}
        </text>
      </svg>
    </div>
  );
};
