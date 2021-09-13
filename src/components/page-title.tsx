import { Helmet } from "react-helmet-async";

interface IPageTitleProps {
  title: string;
}

export const PageTitle: React.FC<IPageTitleProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} : 팟방</title>
    </Helmet>
  );
};
