/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me_subscriptions {
  __typename: "Podcast";
  id: number;
}

export interface meQuery_me_likes {
  __typename: "Podcast";
  id: number;
}

export interface meQuery_me {
  __typename: "User";
  id: number;
  email: string;
  subscriptions: meQuery_me_subscriptions[];
  likes: meQuery_me_likes[];
  role: UserRole;
}

export interface meQuery {
  me: meQuery_me;
}
