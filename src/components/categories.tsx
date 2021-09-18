import { Link } from "react-router-dom";

interface ICategoriesProps {
  id: number;
  name: string;
  slug: string;
  coverImg: string;
}

export const Categories: React.FC<ICategoriesProps> = ({
  id,
  slug,
  name,
  coverImg,
}) => {
  return (
    <Link key={id} to={`/category/${slug}`}>
      <div className="flex flex-col items-center cursor-pointer transform hover:-translate-y-2 transition-transform mt-2">
        <div
          className="w-24 h-24 rounded-full bg-cover cursor-pointer mx-2"
          style={{ backgroundImage: `url(${coverImg})` }}
        ></div>
        <span className="mt-1 text-md text-center font-light ">{name}</span>
      </div>
    </Link>
  );
};
