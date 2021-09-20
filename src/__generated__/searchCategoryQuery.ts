/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchCategoryQuery
// ====================================================

export interface searchCategoryQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string;
  slug: string;
  podcastCount: number;
}

export interface searchCategoryQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: searchCategoryQuery_allCategories_categories[] | null;
}

export interface searchCategoryQuery {
  allCategories: searchCategoryQuery_allCategories;
}
