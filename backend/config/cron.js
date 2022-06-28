'use strict';

module.exports = {
  /**
   * Cron job with timezone example.
   * Every Monday at 1am for Europe/Madrid timezone.
   * List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
   */


  cronNewsItems: {
    task: async ({ strapi }) => {
      await strapi.config.tasks.updateFeed();
    },
    options: {
      rule: '0 1 * * *',
      tz: 'Europe/Madrid',
    },
  },
};
