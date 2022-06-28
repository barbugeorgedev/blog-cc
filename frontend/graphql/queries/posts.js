import { gql } from "@apollo/client";

export const QUERY_ALL_POSTS = gql`
    query AllPosts {
        posts(sort: "publishedAt:desc") {
            data {
                id
                attributes {
                    createdAt
                    publishedAt
                    updatedAt
                    title
                    content
                    slug
                    preview
                    categories {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    author {
                        data {
                            id
                            attributes {
                                Name
                            }
                        }
                    }
                    seoTitle
                }
            }
        }
    }
`;

export const QUERY_POST_BY_SLUG = gql`
    query Posts($slug: String!) {
        findSlug(modelName: "post", slug: $slug) {
            ... on PostEntityResponse {
                data {
                    id
                    attributes {
                        createdAt
                        publishedAt
                        updatedAt
                        title
                        content
                        slug
                        preview
                        categories {
                            data {
                                id
                                attributes {
                                    name
                                }
                            }
                        }
                        author {
                            data {
                                id
                                attributes {
                                    Name
                                }
                            }
                        }
                        seoTitle
                    }
                }
            }
        }
    }
`;
