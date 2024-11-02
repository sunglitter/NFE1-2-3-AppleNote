import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Apple1 from "../../assets/images/apple.png";
import Apple3 from "../../assets/images/apple3.jpg";
import Apple4 from "../../assets/images/apple4.jpg";
import Paper from "../../assets/images/paper.png";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+KR:wght@900&display=swap');

  body {
    margin: 0;
    font-family: 'Libre Baskerville';
    background-color: #fff;
    color: #333;
  }
`;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMoved, setIsMoved] = useState(false);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  // 이미지 이동 상태를 토글하는 함수
  const toggleImagePosition = () => {
    setIsMoved(!isMoved);
  };

  return (
    <Container>
      <GlobalStyle />
      <LeftSection>
        <VerticalLine />
        <Title>APPLE</Title>
        <Title>NOTE</Title>
        <AppleImageContainer onClick={toggleImagePosition}>
          <AppleImage src={Apple1} alt="Apple1" />
        </AppleImageContainer>
      </LeftSection>
      <RightSection>
        <Div1>
          <Image1 src={Apple4} alt="Apple3" />
          <ButtonGroup>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleSignup}>SignUp</Button>
          </ButtonGroup>
        </Div1>
        <Image2 src={Apple3} alt="Apple4" />
        <Subtitle1>Place For</Subtitle1>
        <Subtitle2>BETTER RECORDS.</Subtitle2>
        <ImageContainer>
          <Image3 src={Paper} alt="Paper" />
        </ImageContainer>
      </RightSection>
    </Container>
  );
};

export default LandingPage;

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  flex-direction: row;
  background-color: #fff;
  min-width: 700px;

  @media (max-width: 1000px) {
    flex-direction: column; /* 작은 화면에서는 세로로 배치 */
    height: auto;
  }
`;

const LeftSection = styled.div`
  display: flex;
  margin: 0 auto; /* 중앙 정렬 */
  min-width: 40vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  align-items: center;

  @media (max-width: 1000px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  position: relative;
  font-size: 7.5rem;
  font-weight: 700;
  color: #333;
  font-family: "Merriweather", serif;

  @media (max-width: 1000px) {
    font-size: 6rem; /* 작은 화면에서는 폰트 크기 축소 */
  }
`;

const AppleImageContainer = styled.div`
  position: relative;
  overflow: visible;
  width: 100%;
  min-width: 600px;
  bottom: 0px;
`;

const AppleImage = styled.img`
  width: 100%;
  object-fit: cover;
  position: relative;
`;

const VerticalLine = styled.div`
  position: absolute;
  right: 0;
  width: 2px;
  height: 98%;
  background-color: #333;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const RightSection = styled.div`
  flex-basis: 65vw;
  margin: 0 auto; /* 중앙 정렬 */
  padding: 15px 15px; /* 좌우 패딩 */
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Div1 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Image1 = styled.img`
  position: relative;
  width: 70%;
  height: auto;
  object-fit: cover;
  padding: 20px;
  z-index: 1;
  min-width: 500px;

  @media (max-width: 1000px) {
    width: 90%;
    min-width: 200px;
    margin-left: -20px;
  }
`;

const ButtonGroup = styled.div`
  position: relative;
  opacity: 1;
  width: 30%;
  display: flex;
  flex-direction: row;
  margin-top: -25%;
  margin-left: -20px;

  /* @media (max-width: 2400px) {
    bottom: 100px;
    left: 0px;
    width: 30%;
  } */
`;

const Button = styled.button`
  position: relative;
  width: 140px;
  font-size: 3rem;
  font-weight: 600;
  color: black;
  background-color: transparent;
  border: none;
  transition: 0.3s;
  cursor: pointer;
  font-family: "Merriweather", serif;

  @media (max-width: 2433px) {
    font-size: 2rem;
  }
`;

const Image2 = styled.img`
  position: relative;
  width: 50%;
  object-fit: cover;
  margin-top: -30%;
  margin-left: 55%;
`;

const Subtitle1 = styled.h2`
  position: relative;
  margin-left: 1vw;
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  font-family: "Merriweather", serif;

  @media (max-width: 1800px) {
    margin-left: 3vw;
    text-align: center; /* 텍스트 가운데 정렬 */
    font-size: 2rem;
  }
  @media (max-width: 1000px) {
    margin-left: 3vw;
    text-align: center; /* 텍스트 가운데 정렬 */
  }
`;

const Subtitle2 = styled.h2`
  position: relative;
  margin-top: -1vh;
  margin-left: 1vw;
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  font-family: "Merriweather", serif;
  border-bottom: 1.5px solid;

  @media (max-width: 1800px) {
    margin-left: 3vw;
    text-align: center; /* 텍스트 가운데 정렬 */
    font-size: 2rem;
  }

  @media (max-width: 1000px) {
    margin-left: 3vw;
    text-align: center; /* 텍스트 가운데 정렬 */
    border-bottom: none; /* 작은 화면에서 하단 테두리 제거 */
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-width: 400px;
  margin-top: -85px;

  @media (max-width: 1000px) {
    width: 100%; /* 작은 화면에서 너비 조정 */
    margin-top: 0;
    margin-left: 0;
  }
`;

const Image3 = styled.img`
  position: relative;
  object-fit: cover;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;
