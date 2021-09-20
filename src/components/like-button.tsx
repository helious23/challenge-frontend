import { Logo } from "./logo";
import btnSpinnerHeart from "../images/btn-spinner-heart.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ILikeButtonProps {
  onLikes: () => void;
  likeLoading: boolean;
  onLike: boolean | undefined;
}

export const LikeButton: React.FC<ILikeButtonProps> = ({
  onLike,
  likeLoading,
  onLikes,
}) => {
  return (
    <div
      onClick={onLikes}
      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
    >
      {likeLoading ? (
        <div className="">
          <Logo logoFile={btnSpinnerHeart} option={"w-5"} />
        </div>
      ) : (
        <>
          {onLike ? (
            <FontAwesomeIcon icon={["fas", "heart"]} className="text-red-400" />
          ) : (
            <FontAwesomeIcon icon={["far", "heart"]} className="text-red-400" />
          )}
        </>
      )}
    </div>
  );
};
