/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePromotionImgInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createPromotionImg
// ====================================================

export interface createPromotionImg_createPromotionImg {
  __typename: "CreatePromotionImgOutput";
  ok: boolean;
  error: string | null;
}

export interface createPromotionImg {
  createPromotionImg: createPromotionImg_createPromotionImg;
}

export interface createPromotionImgVariables {
  createPromotionImgInput: CreatePromotionImgInput;
}
