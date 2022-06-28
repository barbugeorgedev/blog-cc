'use strict';

const Parser = require('rss-parser');

// 1
function diffInDays(date1, date2) {
  const difference = Math.floor(date1) - Math.floor(date2);
  return Math.floor(difference / 60 / 60 / 24);
}

// 2
async function getNewFeedItemsFrom(feedUrl) {
  const parser = new Parser();
  const rss = await parser.parseURL(feedUrl);
  const todaysDate = new Date().getTime() / 1000;
  return rss.items.filter((item) => {
    const blogPublishedDate = new Date(item.pubDate).getTime() / 1000;
    return diffInDays(todaysDate, blogPublishedDate) === 0;
  });
}

// 3
async function getFeedUrls() {
  return await strapi.service('api::feedsource.feedsource').find({
    enabled: true,
  });
}

// 4
async function getNewFeedItems() {
  let allNewFeedItems = [];

  const feeds = await getFeedUrls();
  const feedsResults = feeds.results;
  for (let i = 0; i < feedsResults.length; i++) {
    const { link } = feedsResults[i];
    const feedItems = await getNewFeedItemsFrom(link);
    allNewFeedItems = [...allNewFeedItems, ...feedItems];
  }
  return allNewFeedItems;
}

// 5
async function main() {
  const feedItems = await getNewFeedItems();
  for (let i = 0; i < feedItems.length; i++) {
    const item = feedItems[i];

    const postItem = {
      data: {
        title: item.title,
        preview: item.contentSnippet,
        content: item.content,
        author: 1,
        category: 1,
        publishedAt: null,
      }
    };

    await strapi.service('api::post.post').create(postItem);
  }
}

// 6
module.exports = {
  main,
};
