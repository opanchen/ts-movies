import { moviesAPI } from "src/services/moviesAPI";
import avatarMale from "../../../assets/images/avatar-male.jpg";
import avatarFemale from "../../../assets/images/avatar-female.jpg";
import avatarDefault from "../../../assets/images/avatar-default.jpg";
import type { CastItemType } from "src/types";
import css from "./CastCard.module.css";

type Props = {
  data: CastItemType;
};

export const CastCard: React.FC<Props> = ({ data }: Props) => {
  const { name, character, profile_path: profileImg, gender } = data;

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
    ? `${moviesAPI.imgBaseURL.middle}${profileImg}`
    : defaultImg;

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
