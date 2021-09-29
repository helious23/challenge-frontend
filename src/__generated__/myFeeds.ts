/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myFeeds
// ====================================================

export interface myFeeds_myFeeds_podcasts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface myFeeds_myFeeds_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string | null;
  rating: number | null;
  episodeUrl: string | null;
}

export interface myFeeds_myFeeds_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: myFeeds_myFeeds_podcasts_category | null;
  episodes: myFeeds_myFeeds_podcasts_episodes[];
}

export interface myFeeds_myFeeds {
  __typename: "MyFeedsOutput";
  ok: boolean;
  error: string | null;
  podcasts: myFeeds_myFeeds_podcasts[] | null;
}

export interface myFeeds {
  myFeeds: myFeeds_myFeeds;
}
