import css from "./CircleProgressBar.module.css";

type Props = {
  //   percentage: number;
  circleWidth: number;
  vote: number;
};

export const CircleProgressBar: React.FC<Props> = ({
  //   percentage,
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
          {/* {percentage}% */}
          {/* {Math.round10(55.55, -1) } */}
          {vote.toFixed(1)}
        </text>
      </svg>
    </div>
  );
};
