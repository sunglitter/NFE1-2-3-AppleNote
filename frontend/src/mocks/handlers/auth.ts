import { http, HttpResponse, HttpResponseResolver } from "msw";

import { validateContentBody, validateContentType } from "@mocks/helper";
import { BASE_URL } from "@common/api/fetch";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  userId: string;
  name: string;
  email: string;
  bannerImage: string | null;
  profileImage: string | null;
};

type EmailCheckResponse = string;

type AuthResponse<P> = {
  statusCode: number;
  payload: P;
};

type AuthErrorResponse = {
  error: {
    statusCode: number;
    message: string;
  };
};

const handleAuthRequest = (
  url: string,
  method: keyof typeof http,
  resolver: HttpResponseResolver<
    never,
    LoginRequest,
    AuthResponse<LoginResponse> | AuthResponse<EmailCheckResponse> | AuthErrorResponse
  >
) => {
  return http[method](url, resolver);
};

export const handlers = [
  handleAuthRequest(`${BASE_URL}/auth/login`, "post", async ({ request }) => {
    const url = new URL(request.url);
    const isThrowError = url.searchParams.get("error");

    if (!isThrowError) {
      return HttpResponse.json(
        {
          error: {
            statusCode: 401,
            message: "Invalid password",
          },
        },
        { status: 401 }
      );
    }

    const data = await request.json();

    await validateContentType(request, "application/json");
    await validateContentBody(!data.email || !data.password, "Missing email or password");

    return HttpResponse.json({
      statusCode: 200,
      payload: {
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamVvbmdiYWViYW5nIiwidXNlcklkIjoiODkzN2MzZWUtN2I5NS00Njg4LWI3ZmUtOWMyZjE5MGU1M2RhIn0.D0oyvTrwN169uG9VvDvUpXgzD5Nio512ROlACguWLSs",
        userId: "671a140c3b619438688cd5e3",
        name: data.email,
        email: data.password,
        bannerImage: null,
        profileImage: null,
      },
    });
  }),
  handleAuthRequest(`${BASE_URL}/auth/email`, "post", async ({ request }) => {
    const url = new URL(request.url);
    const isThrowError = url.searchParams.get("error");

    if (isThrowError) {
      return HttpResponse.json(
        {
          error: {
            statusCode: 422,
            message: "Existing Email",
          },
        },
        { status: 422 }
      );
    }

    const data = await request.json();

    await validateContentType(request, "application/json");
    await validateContentBody(!data.email, "No email was provided");

    return HttpResponse.json({
      statusCode: 200,
      payload: "This email is available",
    });
  }),
];
