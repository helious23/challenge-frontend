/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myPodcastInfo
// ====================================================

export interface myPodcastInfo_myPodcast_podcast_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface myPodcastInfo_myPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string | null;
  rating: number | null;
  episodeUrl: string | null;
}

export interface myPodcastInfo_myPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: myPodcastInfo_myPodcast_podcast_category | null;
  episodes: myPodcastInfo_myPodcast_podcast_episodes[];
}

export interface myPodcastInfo_myPodcast {
  __typename: "MyPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: myPodcastInfo_myPodcast_podcast | null;
}

export interface myPodcastInfo {
  myPodcast: myPodcastInfo_myPodcast;
}

export interface myPodcastInfoVariables {
  input: MyPodcastInput;
}
