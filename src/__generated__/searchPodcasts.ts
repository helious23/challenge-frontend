/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcasts
// ====================================================

export interface searchPodcasts_searchPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface searchPodcasts_searchPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: searchPodcasts_searchPodcasts_podcasts_category | null;
}

export interface searchPodcasts_searchPodcasts {
  __typename: "SearchPodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  podcasts: searchPodcasts_searchPodcasts_podcasts[] | null;
}

export interface searchPodcasts {
  searchPodcasts: searchPodcasts_searchPodcasts;
}

export interface searchPodcastsVariables {
  input: SearchPodcastsInput;
}
