/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyPodcastInput, CountSubscriptionsInput, CountLikesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myPodcast
// ====================================================

export interface myPodcast_myPodcast_podcast_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface myPodcast_myPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string | null;
  rating: number | null;
  episodeUrl: string | null;
}

export interface myPodcast_myPodcast_podcast_reviews_reviewer {
  __typename: "User";
  id: number;
  email: string;
}

export interface myPodcast_myPodcast_podcast_reviews {
  __typename: "Review";
  id: number;
  createdAt: any;
  title: string;
  text: string;
  reviewer: myPodcast_myPodcast_podcast_reviews_reviewer | null;
}

export interface myPodcast_myPodcast_podcast_subscriber {
  __typename: "User";
  email: string;
}

export interface myPodcast_myPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: myPodcast_myPodcast_podcast_category | null;
  isPromoted: boolean;
  episodes: myPodcast_myPodcast_podcast_episodes[];
  reviews: myPodcast_myPodcast_podcast_reviews[];
  subscriber: myPodcast_myPodcast_podcast_subscriber[];
}

export interface myPodcast_myPodcast {
  __typename: "MyPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: myPodcast_myPodcast_podcast | null;
}

export interface myPodcast_countSubscriptions {
  __typename: "CountSubscriptionsOutput";
  users: number | null;
}

export interface myPodcast_countLikes {
  __typename: "CountLikesOutput";
  users: number | null;
}

export interface myPodcast {
  myPodcast: myPodcast_myPodcast;
  countSubscriptions: myPodcast_countSubscriptions;
  countLikes: myPodcast_countLikes;
}

export interface myPodcastVariables {
  input: MyPodcastInput;
  countSubscriptionsInput: CountSubscriptionsInput;
  countLikesInput: CountLikesInput;
}
