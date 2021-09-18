import gql from "graphql-tag";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    coverImg
    description
    category {
      name
      slug
    }
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImg
    slug
    categoryCount
  }
`;

export const EPISODE_FRAGMENT = gql`
  fragment EpisodeParts on Episode {
    id
    title
    createdAt
    description
    rating
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment ReviewParts on Review {
    id
    createdAt
    title
    text
    reviewer {
      email
    }
  }
`;
