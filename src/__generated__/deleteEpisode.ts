/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EpisodesSearchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteEpisode
// ====================================================

export interface deleteEpisode_deleteEpisode {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteEpisode {
  deleteEpisode: deleteEpisode_deleteEpisode;
}

export interface deleteEpisodeVariables {
  deleteEpisodeInput: EpisodesSearchInput;
}
