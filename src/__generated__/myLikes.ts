/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myLikes
// ====================================================

export interface myLikes_myLikes_likes_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface myLikes_myLikes_likes {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: myLikes_myLikes_likes_category | null;
}

export interface myLikes_myLikes {
  __typename: "MyLikesOutput";
  ok: boolean;
  error: string | null;
  likes: myLikes_myLikes_likes[] | null;
}

export interface myLikes {
  myLikes: myLikes_myLikes;
}
