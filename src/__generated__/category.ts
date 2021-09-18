/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: category
// ====================================================

export interface category_category_podcasts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface category_category_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string;
  description: string | null;
  category: category_category_podcasts_category | null;
}

export interface category_category_category {
  __typename: "Category";
  categoryCount: number;
}

export interface category_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  podcasts: category_category_podcasts[] | null;
  category: category_category_category | null;
}

export interface category_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string;
  slug: string;
  categoryCount: number;
}

export interface category_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: category_allCategories_categories[] | null;
}

export interface category {
  category: category_category;
  allCategories: category_allCategories;
}

export interface categoryVariables {
  input: CategoryInput;
}
