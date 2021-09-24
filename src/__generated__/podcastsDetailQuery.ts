/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput, CountSubscriptionsInput, CountLikesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastsDetailQuery
// ====================================================

export interface podcastsDetailQuery_getPodcast_podcast_creator {
  __typename: "User";
  email: string;
}

export interface podcastsDetailQuery_getPodcast_podcast_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface podcastsDetailQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string | null;
  rating: number | null;
  episodeUrl: string | null;
}

export interface podcastsDetailQuery_getPodcast_podcast_reviews_reviewer {
  __typename: "User";
  id: number;
  email: string;
}

export interface podcastsDetailQuery_getPodcast_podcast_reviews {
  __typename: "Review";
  id: number;
  createdAt: any;
  title: string;
  text: string;
  reviewer: podcastsDetailQuery_getPodcast_podcast_reviews_reviewer | null;
}

export interface podcastsDetailQuery_getPodcast_podcast {
  __typename: "Podcast";
  creator: podcastsDetailQuery_getPodcast_podcast_creator;
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: podcastsDetailQuery_getPodcast_podcast_category | null;
  episodes: podcastsDetailQuery_getPodcast_podcast_episodes[];
  reviews: podcastsDetailQuery_getPodcast_podcast_reviews[];
}

export interface podcastsDetailQuery_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: podcastsDetailQuery_getPodcast_podcast | null;
}

export interface podcastsDetailQuery_countSubscriptions {
  __typename: "CountSubscriptionsOutput";
  users: number | null;
}

export interface podcastsDetailQuery_countLikes {
  __typename: "CountLikesOutput";
  users: number | null;
}

export interface podcastsDetailQuery {
  getPodcast: podcastsDetailQuery_getPodcast;
  countSubscriptions: podcastsDetailQuery_countSubscriptions;
  countLikes: podcastsDetailQuery_countLikes;
}

export interface podcastsDetailQueryVariables {
  PodcastSearchInput: PodcastSearchInput;
  CountSubscriptionsInput: CountSubscriptionsInput;
  CountLikesInput: CountLikesInput;
}
