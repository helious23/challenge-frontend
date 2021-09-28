import { Link } from "react-router-dom";
import { PageTitle } from "../../components/page-title";
import routes from "../../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NoLike: React.FC = () => (
  <div className="mt-80 flex flex-col items-center justify-center">
    <PageTitle title={"좋아요 표시한 팟캐스트가 없습니다"} />
    <h2 className="font-semibold text-2xl mb-3">
      좋아요
      <span className="mx-1">
        <FontAwesomeIcon icon={["fas", "heart"]} className="text-red-400" />
      </span>
      표시한 팟캐스트가 없습니다
    </h2>
    <h4 className="font-medium text-base mb-5">
      다양한 주제의 카테고리를 검색해보세요!
    </h4>
    <Link
      className="text-sky-500 hover:underline hover:text-sky-700"
      to={routes.search}
    >
      팟캐스트 검색하러 가기 &rarr;
    </Link>
  </div>
);
