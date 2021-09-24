/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyPodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myPodcasts
// ====================================================

export interface myPodcasts_myPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface myPodcasts_myPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: myPodcasts_myPodcasts_podcasts_category | null;
}

export interface myPodcasts_myPodcasts {
  __typename: "MyPodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  podcasts: myPodcasts_myPodcasts_podcasts[] | null;
}

export interface myPodcasts {
  myPodcasts: myPodcasts_myPodcasts;
}

export interface myPodcastsVariables {
  input: MyPodcastsInput;
}
