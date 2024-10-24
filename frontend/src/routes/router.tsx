import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "routes/ErrorPage.tsx";
import HomePage from "@components/main/HomePage";
import NotFoundPage from "routes/NotFoundPage.tsx";
import CreatePostPage from "@components/post/CreatePostPage";
import SettingPage from "@components/myPage/SettingPage";

const router = createBrowserRouter([
  // 메인 페이지
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create-post",
    element: <CreatePostPage />,
  },
  {
    path: "/setting",
    element: <SettingPage />,
  },
  // 404 페이지
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

export default router;
