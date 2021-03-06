import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IPagenationProps {
  page: number;
  totalPages: number | null | undefined;
  onPrevPageClick: () => void;
  onNextPageClick: () => void;
}

export const Pagination: React.FC<IPagenationProps> = ({
  page,
  totalPages,
  onPrevPageClick,
  onNextPageClick,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 text-center max-w-md mx-auto">
      {page > 1 ? (
        <div
          onClick={onPrevPageClick}
          className="w-8 h-8 bg-sky-200 rounded-full flex justify-center items-center pr-0.5 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="focus:outline-none text-xl text-sky-600 "
          />
        </div>
      ) : (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center pr-0.5 opacity-30">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="focus:outline-none text-xl text-gray-600"
          />
        </div>
      )}
      {page !== totalPages ? (
        <div
          onClick={onNextPageClick}
          className="w-8 h-8 bg-sky-200 rounded-full flex justify-center items-center pl-0.5 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="focus:outline-none text-xl text-sky-600"
          />
        </div>
      ) : (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center pl-0.5 opacity-30">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="focus:outline-none text-xl text-gray-600"
          />
        </div>
      )}
    </div>
  );
};
