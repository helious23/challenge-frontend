/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodes
// ====================================================

export interface getEpisodes_getEpisodes_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string | null;
  rating: number | null;
}

export interface getEpisodes_getEpisodes {
  __typename: "EpisodesOutput";
  ok: boolean;
  error: string | null;
  episodes: getEpisodes_getEpisodes_episodes[] | null;
}

export interface getEpisodes {
  getEpisodes: getEpisodes_getEpisodes;
}

export interface getEpisodesVariables {
  GetEpisodesInput: PodcastSearchInput;
}
