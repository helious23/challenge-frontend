import { Logo } from "./logo";
import btnSpinner from "../images/btn-spinner.svg";
import btnSpinnerBlue from "../images/btn-spinner-blue.svg";
import { meQuery } from "../__generated__/meQuery";

interface ISubButtonProps {
  onSubscribe: () => void;
  onSubscription: boolean | undefined;
  subLoading: boolean;
  userData: meQuery | undefined;
  id: string;
}

export const SubButton: React.FC<ISubButtonProps> = ({
  onSubscribe,
  onSubscription,
  subLoading,
  userData,
  id,
}) => {
  return (
    <div
      onClick={onSubscribe}
      className={`rounded-3xl flex items-center justify-between py-1 cursor-pointer mr-3 ${
        onSubscription
          ? "bg-white text-gray-400 border border-gray-300"
          : "bg-sky-500 text-white"
      }`}
    >
      {subLoading ? (
        <div className="px-10 lg:px-20 py-0.5">
          <Logo
            logoFile={onSubscription ? btnSpinnerBlue : btnSpinner}
            option={"w-8"}
          />
        </div>
      ) : (
        <>
          <div className="text-2xl mb-1 ml-4 lg:mx-4 font-extralight">
            {onSubscription ? "-" : "+"}
          </div>
          <div
            className={`w-full ${
              userData?.me.subscriptions.some((podcast) => podcast.id === +id)
                ? "ml-3 lg:ml-8 mr-6 lg:mr-16 font-light text-sm"
                : "ml-6 lg:ml-10 mr-8 lg:mr-20 font-medium text-md "
            }`}
          >
            {onSubscription ? "구독 취소" : "구독"}
          </div>
        </>
      )}
    </div>
  );
};
