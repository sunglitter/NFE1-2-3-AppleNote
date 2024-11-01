import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchLatestPosts, Post } from "./postApi";
import MoreButton from "@common/components/MoreButton";

const LatestPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  // 최신 포스트 가져오기
  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchLatestPosts();

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getPosts();
  }, []);

  // 포스트 클릭 핸들러
  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  // MoreButton 클릭 핸들러
  const handleMoreButtonClick = () => {
    navigate("/posts"); // 전체 포스트 목록 페이지로 이동
  };

  return (
    <Container>
      <Header>
        <Title>LATEST POSTS</Title>
        <MoreButton onClick={handleMoreButtonClick} />
      </Header>
      <PostsGridWrapper>
        <PostsGrid>
          {posts.map((post) => (
            <PostCard key={post.postId} onClick={() => handlePostClick(post.postId)}>
              <Thumbnail src={post.images[0]} alt={post.title} />
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
            </PostCard>
          ))}
        </PostsGrid>
      </PostsGridWrapper>
      <Divider />
    </Container>
  );
};

const Container = styled.div`
  width: 1205px;
  min-width: 500px;
  margin: 0;
  @media (max-width: 1205px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 1rem;
  position: relative;
  width: 100%;
  max-width: 1205px;
`;

const Title = styled.h2`
  font-size: clamp(3.5rem, 5vw, 6rem);
  font-weight: bold;
  margin-bottom: 3rem;
  margin-left: 20px;
  align-self: flex-start;
`;

/* PostsGrid를 중앙 정렬하고 양 옆에 여백을 추가 */
const PostsGridWrapper = styled.div`
  display: flex;
  justify-content: center; /* 그리드 전체를 중앙 정렬 */
  padding: 0;
`;

const PostsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  padding: 0 16px;

  /* 기본 3개씩 */
  grid-template-columns: repeat(3, minmax(0, 1fr));

  /* 화면 너비가 줄어들 때 2개로 조정 */
  @media (max-width: 1236px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* 더 좁아지면 1개로 조정 */
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled.div`
  width: 100%;
  max-width: 369px;
  display: flex;
  flex-direction: column;
  padding: 0.2rem;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PostTitle = styled.h3`
  display: -webkit-box; /* Flexbox 대체로 줄 제한 */
  -webkit-line-clamp: 3; /* 최대 줄 수: 3줄 */
  -webkit-box-orient: vertical; /* 세로 방향 박스 */
  overflow: hidden; /* 넘치는 내용 숨김 */
  text-overflow: ellipsis; /* 줄임표(...) 표시 */
  white-space: normal; /* 자동 줄바꿈 허용 */
  margin: 1rem 0 1.5rem;
  font-size: 2rem;
`;

const PostContent = styled.p`
  display: -webkit-box; /* Flexbox 대체로 줄 제한 */
  -webkit-line-clamp: 2; /* 최대 줄 수: 2줄 */
  -webkit-box-orient: vertical; /* 세로 방향 박스 */
  overflow: hidden; /* 넘치는 내용 숨김 */
  text-overflow: ellipsis; /* 줄임표(...) 표시 */
  white-space: normal; /* 자동 줄바꿈 허용 */
`;

const Divider = styled.hr`
  margin: 5rem 0;
  border: 1px solid;
  width: 100%;
`;

export default LatestPosts;
