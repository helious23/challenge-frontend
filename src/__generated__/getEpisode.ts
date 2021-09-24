/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEpisodeInput, PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisode
// ====================================================

export interface getEpisode_getEpisode_episode {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string | null;
  rating: number | null;
  episodeUrl: string | null;
}

export interface getEpisode_getEpisode {
  __typename: "GetEpisodeOutput";
  ok: boolean;
  error: string | null;
  episode: getEpisode_getEpisode_episode | null;
}

export interface getEpisode_getPodcast_podcast_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface getEpisode_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: getEpisode_getPodcast_podcast_category | null;
}

export interface getEpisode_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getEpisode_getPodcast_podcast | null;
}

export interface getEpisode {
  getEpisode: getEpisode_getEpisode;
  getPodcast: getEpisode_getPodcast;
}

export interface getEpisodeVariables {
  GetEpisodeInput: GetEpisodeInput;
  PodcastSearchInput: PodcastSearchInput;
}
