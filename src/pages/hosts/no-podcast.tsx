import { Link } from "react-router-dom";
import { PageTitle } from "../../components/page-title";
import routes from "../../routes";

export const NoPodcast: React.FC = () => (
  <div className="mt-80 flex flex-col items-center justify-center">
    <PageTitle title={"등록된 팟캐스트가 없습니다"} />
    <h2 className="font-semibold text-2xl mb-3">등록된 팟캐스트가 없습니다</h2>
    <h4 className="font-medium text-base mb-5">
      멋진 아이디어로 나만의 팟캐스트를 등록하세요!
    </h4>
    <Link
      className="text-sky-500 hover:underline hover:text-sky-700"
      to={routes.addPodcast}
    >
      팟캐스트 등록하러 가기 &rarr;
    </Link>
  </div>
);
