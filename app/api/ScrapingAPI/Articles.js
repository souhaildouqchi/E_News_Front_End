import client from "./client";

const endpoint_articles = "/articles"; // the end points needs to be changed to /posts/nytimes et pour huffpost : /posts/huffpost
const endpoint_posts = "/posts"; // end point huffington post
const endpoint_wposts = "/wposts"; // end point washington post
const getArticles = () => client.get(endpoint_articles);
const getPosts = () => client.get(endpoint_posts);

export default {
  getArticles,
  getPosts,
};
