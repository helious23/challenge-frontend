/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createEpisode
// ====================================================

export interface createEpisode_createEpisode {
  __typename: "CreateEpisodeOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface createEpisode {
  createEpisode: createEpisode_createEpisode;
}

export interface createEpisodeVariables {
  createEpisodeInput: CreateEpisodeInput;
}
