module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagname: "gql",
    service: {
      name: "nubereats-challenge-backend",
      url: "https://nuber-eats-challenge-back.herokuapp.com/graphql",
    },
  },
};
