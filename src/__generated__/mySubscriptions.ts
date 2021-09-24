/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mySubscriptions
// ====================================================

export interface mySubscriptions_mySubscriptions_podcasts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface mySubscriptions_mySubscriptions_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: mySubscriptions_mySubscriptions_podcasts_category | null;
}

export interface mySubscriptions_mySubscriptions {
  __typename: "MySubscriptionOutput";
  ok: boolean;
  error: string | null;
  podcasts: mySubscriptions_mySubscriptions_podcasts[] | null;
}

export interface mySubscriptions {
  mySubscriptions: mySubscriptions_mySubscriptions;
}
