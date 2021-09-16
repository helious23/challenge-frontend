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
    <div className="flex flex-col mx-auto md:ml-0 w-80 md:w-auto transform hover:-translate-y-2 transition-transform mt-2">
      <img
        src={coverImg}
        alt={title}
        className="w-full h-full rounded-lg bg-cover bg-center mb-3"
      />

      <h3 className="text-xl font-medium truncate">{title}</h3>
      <span className="border-t mt-2 pt-2 border-gray-400 text-sm opacity-50">
        {categoryName}
      </span>
      <span className="text-sm opacity-50 truncate">{description}</span>
    </div>
  </Link>
);
