/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditPasswordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editPasswordMutation
// ====================================================

export interface editPasswordMutation_editPassword {
  __typename: "EditPasswordOutput";
  ok: boolean;
  error: string | null;
}

export interface editPasswordMutation {
  editPassword: editPasswordMutation_editPassword;
}

export interface editPasswordMutationVariables {
  input: EditPasswordInput;
}
