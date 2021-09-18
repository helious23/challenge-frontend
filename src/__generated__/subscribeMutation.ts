/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleSubscribeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: subscribeMutation
// ====================================================

export interface subscribeMutation_toggleSubscribe {
  __typename: "ToggleSubscribeOutput";
  ok: boolean;
  error: string | null;
}

export interface subscribeMutation {
  toggleSubscribe: subscribeMutation_toggleSubscribe;
}

export interface subscribeMutationVariables {
  input: ToggleSubscribeInput;
}
