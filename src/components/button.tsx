import { Logo } from "./logo";
import btnSpinner from "../images/btn-spinner.svg";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`mt-3 py-3 text-white font-medium text-lg rounded-3xl focus:outline-none transition-colors ${
      canClick
        ? " bg-sky-400 hover:bg-sky-600"
        : " bg-gray-300 pointer-events-none"
    } ${loading ? "cursor-wait" : ""}`}
  >
    {loading ? (
      <div className="flex justify-center items-center">
        <Logo logoFile={btnSpinner} option={"h-7"} />
      </div>
    ) : (
      actionText
    )}
  </button>
);
