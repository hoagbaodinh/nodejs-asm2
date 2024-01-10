import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./layout.scss";
import { useRouteLoaderData, useNavigate } from "react-router-dom";

const Layout = () => {
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      window.alert("You must be logged in first");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="content">
      <Sidebar />
      <div className="contentContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
