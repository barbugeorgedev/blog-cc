import { useState } from "react";
import { any } from "prop-types";


import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import BlogLayout from '@layouts/BlogLayout'
import Blog, { POSTS_PER_PAGE } from '../../blog'

import { getAllPosts } from "@/lib/apollo/posts";

export async function getStaticPaths() {
  const totalPosts =  await getAllPosts();
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context
  const posts = await getAllPosts();
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function PostPage({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
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