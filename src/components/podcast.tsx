import { Link } from "react-router-dom";

interface IPodcastProps {
  id: number;
  coverImg: string;
  title: string;
  description: string;
  categoryName?: string;
}

export const Podcast: React.FC<IPodcastProps> = ({
  id,
  coverImg,
  title,
  categoryName,
  description,
}) => (
  <Link key={id} to={`/podcast/${id}`}>
    <div className="flex flex-col mx-auto md:ml-0 w-80 md:w-auto rounded-lg p-5 transform hover:bg-sky-100 hover:shadow-lg hover:-translate-y-2 transition-transform mt-2">
      <img
        src={coverImg}
        alt={title}
        className="w-full h-full rounded-lg bg-cover bg-center mb-3 shadow-md"
      />

      <h3 className="text-lg lg:text-md font-medium truncate">{title}</h3>
      <span className="border-t mt-2 pt-2 border-gray-400 text-sky-600 text-sm">
        # {categoryName}
      </span>
      <span className="text-sm opacity-50 truncate">{description}</span>
    </div>
  </Link>
);
