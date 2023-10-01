type Props = {
  id: number | string | undefined;
  arr: {
    id: number | string;
    [key: string]: any;
  }[];
};

export const isMovieCollected = ({ id, arr }: Props): boolean => {
  if (!id) return false;
  return arr.some((item) => item.id.toString() === id.toString());
};
