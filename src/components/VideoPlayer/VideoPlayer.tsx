import ReactPlayer from "react-player/youtube";
import css from "./VideoPlayer.module.css";

type Video = {
  type: string;
  id: string;
  key: string;
  site: string;
  official: boolean;
  size: number;
  published_at: string;
  [key: string]: any;
};

type Props = {
  data: Video[];
};

export const VideoPlayer: React.FC<Props> = ({ data }: Props) => {
  const urlArr = data.map(({ key }) => {
    const url = `https://www.youtube.com/watch?v=${key}`;
    return url;
  });

  return (
    <>
      <div className={css.wrapper}>
        <ReactPlayer
          url={urlArr}
          controls={true}
          className={css.player}
          width="100%"
          //   fallback={<div>PLAYER loading...</div>}
        />
      </div>
    </>
  );
};
