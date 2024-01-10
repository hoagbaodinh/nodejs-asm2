import "./App.scss";
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { action as loginAction } from "./pages/login/Login";
import { action as logoutAction } from "./pages/logout/Logout";
import Layout from "./pages/layout/Layout.jsx";
import { getCurrentUser } from "./util/auth";
import Datatable from "./pages/datatable/Datatable.jsx";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewUser from "./pages/newUser/NewUser.jsx";
import NewHotel from "./pages/newHotel/NewHotel.jsx";
import NewRoom from "./pages/newRoom/NewRoom.jsx";
import TransactionPage from "./pages/transaction/Transaction.jsx";
import ErrorPage from "./pages/error/Error.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      id: "root",
      loader: getCurrentUser,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "users",
          children: [
            {
              index: true,
              element: <Datatable columns={userColumns} title="Users List" />,
            },
            {
              path: "new",
              element: <NewUser edit={false} />,
            },
            {
              path: "edit/:id",
              element: <NewUser edit={true} />,
            },
          ],
        },
        {
          path: "hotels",
          children: [
            {
              index: true,
              element: <Datatable columns={hotelColumns} title="Hotels List" />,
            },
            {
              path: "edit/:id",
              element: <NewHotel edit={true} />,
            },
            {
              path: "new",
              element: <NewHotel edit={false} />,
            },
          ],
        },
        {
          path: "rooms",
          children: [
            {
              index: true,
              element: <Datatable columns={roomColumns} title="Rooms List" />,
            },
            {
              path: "new",
              element: <NewRoom edit={false} />,
            },
            {
              path: "edit/:id",
              element: <NewRoom edit={true} />,
            },
          ],
        },
        {
          path: "transactions",
          children: [
            {
              index: true,
              element: <TransactionPage pSize={9} title="Transaction List" />,
            },
          ],
        },
      ],
    },
    { path: "/login", element: <Login />, action: loginAction },
    { path: "/logout", action: logoutAction },
    { path: "*", element: <ErrorPage /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
