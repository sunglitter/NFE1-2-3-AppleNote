import { httpClient } from "@common/api/fetch";
import axios from "axios";

export type User = {
  name: string;
  email: string;
  profileImg: string;
  bannerImg: string;
};
interface PasswordForm {
  oldPassword: string;
  newPassword: string;
}
export const getUser = async (): Promise<User> => {
  try {
    const URL = `/users/me`;

    const { data } = await httpClient.get(URL);

    return data.payload;
  } catch {
    throw new Error("유저 정보를 가져오는 데 실패했습니다.");
  }
};

// 비밀번호 변경 API
export const changePassword = async (payload: PasswordForm): Promise<boolean> => {
  try {
    const URL = `/users/password`;

    const { data } = await httpClient.patch(URL, payload);

    return data.payload.isChange;
  } catch {
    return false;
  }
};

// 회원 탈퇴 API
export const deleteUser = async (): Promise<boolean> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("토큰이 존재하지 않습니다.");
  }
  try {
    const response = await axios.delete("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200; // 200이면 성공으로 간주
  } catch {
    throw new Error("회원탈퇴를 실패했습니다.");
  }
};
