import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LayoutPage from "./pages/Layout";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import DetailPage from "./pages/Detail";
import LoginPage, { action as loginAction } from "./pages/Login";
import RegisterPage, { action as registerAction } from "./pages/Register";
import { getCurrentUser } from "./util/auth";
import { action as logoutAction } from "./components/Logout";
import Transaction from "./pages/Transaction";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    loader: getCurrentUser,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "detail/:id", element: <DetailPage /> },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "register", element: <RegisterPage />, action: registerAction },
      { path: "logout", action: logoutAction },
      { path: "transaction/:id", element: <Transaction /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
