/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReviewParts
// ====================================================

export interface ReviewParts_reviewer {
  __typename: "User";
  id: number;
  email: string;
}

export interface ReviewParts {
  __typename: "Review";
  id: number;
  createdAt: any;
  title: string;
  text: string;
  reviewer: ReviewParts_reviewer | null;
}
