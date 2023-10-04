type Genre = {
  id: number;
  name: string;
};

type GenreIds = number[];

type Props = {
  ids: GenreIds;
  fullArr: Genre[];
};

export const getGenres = ({ ids, fullArr }: Props) => {
  const res = ids
    .map((item) => {
      const genre = fullArr.find(({ id }) => id === item);
      return genre?.name;
    })
    .slice(0, 2)
    .join(", ");

  return res;
};
