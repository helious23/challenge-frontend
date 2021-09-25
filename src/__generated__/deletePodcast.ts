/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deletePodcast
// ====================================================

export interface deletePodcast_deletePodcast {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface deletePodcast {
  deletePodcast: deletePodcast_deletePodcast;
}

export interface deletePodcastVariables {
  deletePodcastInput: PodcastSearchInput;
}
