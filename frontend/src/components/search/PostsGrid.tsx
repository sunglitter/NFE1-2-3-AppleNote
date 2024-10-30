import React from "react";
import styled from "styled-components";
import HorizontalPostCard from "../main/HorizontalPostCard";
import { Post } from "../main/postApi";

interface PostsGridProps {
  posts: Post[];
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => (
  <GridContainer>
    {posts.map((post) => (
      <HorizontalPostCard key={post.postId} post={post} />
    ))}
  </GridContainer>
);

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default PostsGrid;