import { moviesAPI } from "src/services/moviesAPI";
import css from "./CastCard.module.css";
import avatarMale from "../../../assets/images/avatar-male.jpg";
import avatarFemale from "../../../assets/images/avatar-female.jpg";
import avatarDefault from "../../../assets/images/avatar-default.jpg";

type CastItemType = {
  name: string;
  character: string;
  known_for_department: string;
  profile_path: string;
  gender: number;
  [key: string]: any;
};

type Props = {
  data: CastItemType;
};

export const CastCard: React.FC<Props> = ({ data }: Props) => {
  //   console.log(data);

  const {
    name,
    character,
    // known_for_department: department,
    profile_path: profileImg,
    gender,
  } = data;

  const genderType = gender === 1 ? "female" : gender === 2 ? "male" : "non";

  let defaultImg;
  switch (genderType) {
    case "male":
      defaultImg = avatarMale;
      break;
    case "female":
      defaultImg = avatarFemale;
      break;
    case "non":
      defaultImg = avatarDefault;
      break;
    default:
      defaultImg = avatarDefault;
      break;
  }

  const image = profileImg
    ? `${moviesAPI.imgBaseURL}${profileImg}`
    : defaultImg;
  //   console.log("IMAGE PATH: ", image);

  return (
    <>
      <div className={css.card}>
        <div className={css.thumb}>
          <img src={image} width={500} height={750} alt={`${name} profile`} />
        </div>

        <div className={css.info}>
          <h4 className={css.name}>{name}</h4>
          <p>
            <span className={css.label}>Character: &#x85;</span>
            {character}
          </p>
        </div>
      </div>
    </>
  );
};
