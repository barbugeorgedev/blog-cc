'use strict';

async function updateFeed() {
  return await strapi.config.feedUpdater.main();
}

module.exports = {
  updateFeed,
};
