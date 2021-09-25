/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarkEpisodeAsPlayedInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: markEpisodeAsPlayed
// ====================================================

export interface markEpisodeAsPlayed_markEpisodeAsPlayed {
  __typename: "MarkEpisodeAsPlayedOutput";
  ok: boolean;
  error: string | null;
}

export interface markEpisodeAsPlayed {
  markEpisodeAsPlayed: markEpisodeAsPlayed_markEpisodeAsPlayed;
}

export interface markEpisodeAsPlayedVariables {
  input: MarkEpisodeAsPlayedInput;
}
