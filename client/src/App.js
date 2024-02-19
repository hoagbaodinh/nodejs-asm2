import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import axios from "axios";
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

axios.defaults.baseURL = "https://booking-app-mern-taupe.vercel.app/";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

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
