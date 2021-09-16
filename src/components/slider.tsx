import Slider from "react-slick";
import { Link } from "react-router-dom";
import { promotionPodcastQuery_promotionPocasts_results } from "../__generated__/promotionPodcastQuery";

interface ISliderProps {
  results: promotionPodcastQuery_promotionPocasts_results[] | null | undefined;
}

export const PromitionSlider: React.FC<ISliderProps> = ({ results }) => {
  function SampleNextArrow(props: any) {
    return (
      <div
        {...props}
        className="xl:w-1/3 xl:h-72 xl:bg-gradient-to-r from-transparent to-white absolute top-0 right-0 cursor-pointer"
      ></div>
    );
  }

  function SamplePrevArrow(props: any) {
    return (
      <div
        {...props}
        className="xl:w-1/3 xl:h-72 xl:bg-gradient-to-r from-white to-transparent absolute top-0 left-0 z-10 cursor-pointer"
      ></div>
    );
  }
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
    <div className="mt-10 py-10">
      {
        <Slider {...settings}>
          {results?.map((podcast) =>
            podcast.promotionImg ? (
              <Link key={podcast.id} to={`/podcast/${podcast.id}`}>
                <div className="flex justify-center items-center">
                  <img
                    src={podcast.promotionImg}
                    alt={podcast.title}
                    className="w-11/12 cursor-pointer rounded-lg"
                  />
                </div>
              </Link>
            ) : (
              ""
            )
          )}
        </Slider>
      }
    </div>
  );
};
