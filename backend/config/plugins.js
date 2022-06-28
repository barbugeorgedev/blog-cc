module.exports = ({ env }) => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        post: {
          field: 'slug',
          references: 'title',
        },
      },
    },
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      defaultLimit: 1000,
      maxLimit: 2000,
      apolloServer: {
        tracing: false,
      },
    },
  },

});
