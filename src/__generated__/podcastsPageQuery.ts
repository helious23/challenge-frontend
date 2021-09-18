/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastsPageQuery
// ====================================================

export interface podcastsPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string;
  slug: string;
  categoryCount: number;
}

export interface podcastsPageQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: podcastsPageQuery_allCategories_categories[] | null;
}

export interface podcastsPageQuery_podcasts_results_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface podcastsPageQuery_podcasts_results {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: podcastsPageQuery_podcasts_results_category | null;
}

export interface podcastsPageQuery_podcasts {
  __typename: "PodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: podcastsPageQuery_podcasts_results[] | null;
}

export interface podcastsPageQuery {
  allCategories: podcastsPageQuery_allCategories;
  podcasts: podcastsPageQuery_podcasts;
}

export interface podcastsPageQueryVariables {
  input: PodcastsInput;
}
