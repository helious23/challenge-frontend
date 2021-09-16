/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: promotionPodcastQuery
// ====================================================

export interface promotionPodcastQuery_promotionPocasts_results {
  __typename: "Podcast";
  id: number;
  title: string;
  promotionImg: string | null;
}

export interface promotionPodcastQuery_promotionPocasts {
  __typename: "PromotionPodcastsOutput";
  ok: boolean;
  error: string | null;
  results: promotionPodcastQuery_promotionPocasts_results[] | null;
}

export interface promotionPodcastQuery {
  promotionPocasts: promotionPodcastQuery_promotionPocasts;
}

export interface promotionPodcastQueryVariables {
  input: PodcastsInput;
}
