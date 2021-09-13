import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Logo } from "../pages/logo";
import spinner from "../images/spinner.svg";
import { meQuery } from "../__generated__/meQuery";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <div className="mt-64 flex justify-center items-center">
        <Logo logoFile={spinner} option={"w-64 mr-10"} />
      </div>
    );
  }
  return (
    <div>
      <div>{data.me.role}</div>
    </div>
  );
};
