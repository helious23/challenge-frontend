const routes = {
  home: "/",
  createAccount: "/create-account",
  profile: "/my-profile",
  editProfile: "/edit-profile",
  editPassword: "/edit-password",
  search: "/search",
  category: "/category/:slug",
  podcast: "/podcast/:id",
  episode: "/podcast/:id/episode/:episodeId",
  subscriptions: "/subscriptions",
  likes: "/likes",
  addPodcast: "/add-podcast",
  addEpisode: "/add-podcast/:id/add-episode",
  editEpisode: "/podcast/:podcastId/edit-episode/:episodeId",
};

export default routes;
