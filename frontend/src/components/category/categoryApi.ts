import axios from "axios";
import { BASE_URL } from "@common/api/fetch";

// 카테고리 응답 타입 정의
export type CategoryResponse = {
  statusCode: number;
  payload: {
    categoryId: string;
    name: string;
  }[];
};

// 카테고리 데이터를 가져오는 함수
export const fetchCategories = async (): Promise<CategoryResponse> => {
  const response = await axios.get(`${BASE_URL}/categories`);

  return response.data; // axios의 응답 구조에 맞게 수정
};

// 카테고리 추가 요청 타입 정의
export type CategoryAddRequest = {
  name: string;
};

// 카테고리 추가 API 함수
export const createCategory = async (data: CategoryAddRequest) => {
  const response = await axios.post(`${BASE_URL}/categories`, data);

  return response.data; // axios의 응답 구조에 맞게 수정
};
