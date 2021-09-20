/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleLikeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: likeMutation
// ====================================================

export interface likeMutation_toggleLike {
  __typename: "ToggleLikeOutput";
  ok: boolean;
  error: string | null;
}

export interface likeMutation {
  toggleLike: likeMutation_toggleLike;
}

export interface likeMutationVariables {
  input: ToggleLikeInput;
}
