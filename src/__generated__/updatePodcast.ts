/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updatePodcast
// ====================================================

export interface updatePodcast_updatePodcast {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface updatePodcast {
  updatePodcast: updatePodcast_updatePodcast;
}

export interface updatePodcastVariables {
  updatePodcastInput: UpdatePodcastInput;
}
