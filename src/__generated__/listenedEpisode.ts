/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: listenedEpisode
// ====================================================

export interface listenedEpisode_listenedEpisode_listenedEpisode {
  __typename: "Episode";
  id: number;
}

export interface listenedEpisode_listenedEpisode {
  __typename: "ListenedEpisodeOutput";
  ok: boolean;
  error: string | null;
  listenedEpisode: listenedEpisode_listenedEpisode_listenedEpisode[] | null;
}

export interface listenedEpisode {
  listenedEpisode: listenedEpisode_listenedEpisode;
}
