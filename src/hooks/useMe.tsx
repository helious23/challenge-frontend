import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      subscriptions {
        id
      }
      likes {
        id
      }
      role
    }
  }
`;

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
};
