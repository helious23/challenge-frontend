/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyPodcastInput } from "./globalTypes";

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
}

export interface myPodcast_myPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: myPodcast_myPodcast_podcast_category | null;
  episodes: myPodcast_myPodcast_podcast_episodes[];
}

export interface myPodcast_myPodcast {
  __typename: "MyPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: myPodcast_myPodcast_podcast | null;
}

export interface myPodcast {
  myPodcast: myPodcast_myPodcast;
}

export interface myPodcastVariables {
  input: MyPodcastInput;
}
