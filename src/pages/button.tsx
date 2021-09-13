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
    {loading ? "로딩 중 ..." : actionText}
  </button>
);
