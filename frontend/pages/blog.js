import { any } from "prop-types";
import { getAllPosts } from "@/lib/apollo/posts";

import siteMetadata from '@/data/siteMetadata'
import BlogLayout from '@/layouts/BlogLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllPosts();
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
      props: { initialDisplayPosts, posts, pagination },
      revalidate: 60 * 60 * 24,

  }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <BlogLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}


Blog.defaultProps = {
    posts: {},
};

Blog.propTypes = {
    posts: any,
};