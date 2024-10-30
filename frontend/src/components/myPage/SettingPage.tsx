import styled from "styled-components";
import edit from "@assets/icons/edit.svg";
import { deleteUser, getUser } from "./userApi";
import { useEffect, useState } from "react";
import { User } from "./userApi";
import ChangePw from "./ChangePw";
import { useAuth } from "@components/auth/useAuth";
import { useNavigate } from "react-router-dom";
import NameEditModal from "./NameEditModal";
const DEFAULT_PROFILE_IMAGE = "/default-profile-image.png";
const SettingPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<boolean>(false);
  // const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isNameModalOpen, setNameModalOpen] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();

      setUser(userData);
    };

    fetchUser();
  }, []);
  const changePw = () => {
    setStatus(true);
  };
  const signout = async () => {
    const confirmed = window.confirm("회원탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."); // 회원탈퇴 확인

    if (confirmed) {
      try {
        const isDeleted = await deleteUser();

        if (isDeleted === true) {
          alert("회원탈퇴 완료");
          navigate("/");
        } else {
          alert("회원 탈퇴에 실패했습니다.");
        }
      } catch {
        alert("회원 탈퇴 중 오류 발생");
      }
    }
  };
  // const editImg = () => {
  //   setImageModalOpen(true); // 이미지 모달 열기
  // };

  const editName = () => {
    setNameModalOpen(true); // 이름 모달 열기
  };
  const { logout } = useAuth();

  const handleLogout = () => {
    const confirmed = window.confirm("로그아웃하시겠습니까?"); // 로그아웃 확인

    if (confirmed) {
      logout({
        onSuccess: () => {
          alert("로그아웃 되었습니다.");
          navigate("/");
        },
        onFailure: () => {
          alert("로그아웃 실패");
        },
      });
    }
  };

  return (
    <>
      {status ? (
        <ChangePw setStatus={setStatus} /> // status가 true이면 ChangePw 컴포넌트 렌더링
      ) : (
        <Wrapper>
          <ProfileWrapper>
            <ImgWrapper>
              <UserImg src={user?.profileImage || DEFAULT_PROFILE_IMAGE} />

              <ImgEditBtn>
                <img src={edit} />
              </ImgEditBtn>
            </ImgWrapper>
            <UserProfile>
              <UserNameWrapper>
                <UserName>{user?.name}</UserName>
                <NameEditBtn onClick={editName}>
                  <img src={edit} />
                </NameEditBtn>
              </UserNameWrapper>

              <UserEmail>{user?.email}</UserEmail>
              <Button onClick={changePw}>비밀번호 변경</Button>
              <Button onClick={signout}>회원 탈퇴</Button>
              <Button onClick={handleLogout}>로그아웃</Button>
            </UserProfile>
          </ProfileWrapper>
          {/* {isImageModalOpen && <ImageEditModal onClose={() => setImageModalOpen(false)} />} */}
          {isNameModalOpen && (
            <NameEditModal
              name={name}
              setName={setName}
              onClose={() => {
                setNameModalOpen(false);
              }}
            />
          )}
        </Wrapper>
      )}
    </>
  );
};

//  모달 인터페이스
// interface ImageEditModalProps {
//   onClose: () => void;
// }

// //프로필 이미지 수정 모달
// const ImageEditModal: React.FC<ImageEditModalProps> = ({ onClose }) => (
//   <ModalOverlay>
//     <ModalContent>
//       <h3>프로필 이미지 변경</h3>
//       <button>확인</button>
//       <button onClick={onClose}>닫기</button>
//     </ModalContent>
//   </ModalOverlay>
// );

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
`;
const ImgWrapper = styled.div`
  position: relative;
  margin-right: 100px;
  display: flex;
  flex-direction: column;
`;
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserImg = styled.div<{ src: string }>`
  border-radius: 50%;
  width: 250px;
  height: 250px;
  background-color: aliceblue;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;
const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
`;

const NameEditBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  padding-top: 10px;
`;
const ImgEditBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 79%;
  margin-top: -10%;
`;

const UserEmail = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 15%;
`;

const Button = styled.button`
  margin-top: 10px;
  width: 160%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default SettingPage;
