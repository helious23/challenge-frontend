/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface EditPasswordInput {
  password?: string | null;
}

export interface EditProfileInput {
  email?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PodcastsInput {
  page?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
