import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { myFeeds_myFeeds_podcasts_episodes } from "../__generated__/myFeeds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ISliderProps {
  episodes: myFeeds_myFeeds_podcasts_episodes[] | null | undefined;
  podcastId: number;
  coverImg: string;
}

export const FeedSlider: React.FC<ISliderProps> = ({
  episodes,
  podcastId,
  coverImg,
}) => {
  function NextArrow(props: any) {
    return (
      <div
        style={props.style}
        onClick={props.onClick}
        className="absolute top-1/3 -right-8 cursor-pointer text-3xl text-gray-400 hover:text-sky-500"
      >
        <FontAwesomeIcon icon={["fas", "arrow-circle-right"]} />
      </div>
    );
  }

  function PrevArrow(props: any) {
    return (
      <div>
        <div
          style={props.style}
          onClick={props.onClick}
          className="absolute top-1/3 -left-8 z-10 cursor-pointer text-3xl text-gray-400 hover:text-sky-500"
        >
          <FontAwesomeIcon icon={["fas", "arrow-circle-left"]} />
        </div>
      </div>
    );
  }
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-5">
      {
        <Slider {...settings}>
          {episodes?.map(
            (episode) =>
              episode.title && (
                <Link
                  key={episode.id}
                  to={`/podcast/${podcastId}/episode/${episode.id}`}
                >
                  <div className="flex justify-around items-center mx-2 my-5 h-32 rounded-lg shadow-lg transform hover:bg-sky-100 hover:shadow-lg hover:-translate-y-2 transition-transform mt-2">
                    <div className="">
                      <img
                        src={coverImg}
                        alt={episode.title}
                        className="cursor-pointer rounded-lg w-24"
                      />
                    </div>
                    <div className="h-20 lg:w-7/12 w-8/12 flex justify-center items-center line-clamp-3 px-1 text-base">
                      <div className="">{episode.title}</div>
                    </div>
                  </div>
                </Link>
              )
          )}
        </Slider>
      }
    </div>
  );
};
