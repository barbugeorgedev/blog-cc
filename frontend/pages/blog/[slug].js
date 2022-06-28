import { object } from "prop-types";

import BlogLayout from "@layouts/legacy/BlogLayout";

import { getAllPosts, getPostBySlug } from "@/lib/apollo/posts";
import { markdownToHtml } from "@/lib/util";

export default function Post({ content, post }) {

  return (
    <BlogLayout post={post}>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts
    .filter((post) => typeof post?.attributes?.slug === "string")
    .map((post) => ({
      params: {
        slug: post?.attributes?.slug,
      },
    }));

  return {
    paths,
    fallback: false,
  };
}

Post.defaultProps = {
  post: {},
};

Post.propTypes = {
  post: object,
};

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  const content = await markdownToHtml(post?.attributes?.content || "");

  return {
    props: {
      content,
      post,
    },
    revalidate: 60 * 60 * 24,
  };
}
