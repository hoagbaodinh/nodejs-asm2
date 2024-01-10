import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Form, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span className="logo">Admin Page</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to={"/users"} style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to={"/hotels"} style={{ textDecoration: "none" }}>
            <li>
              <StoreMallDirectoryIcon className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to={"/rooms"} style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
          <Link to={"/transactions"} style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Transactions</span>
            </li>
          </Link>
          <p className="title">NEW</p>
          <Link to={"/hotels/new"} style={{ textDecoration: "none" }}>
            <li>
              <StoreMallDirectoryIcon className="icon" />
              <span>New Hotel</span>
            </li>
          </Link>
          <Link to={"/rooms/new"} style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>New Room</span>
            </li>
          </Link>

          <p className="title">USER</p>

          <li>
            <Form action="/logout" method="post">
              <button className="headerBtn">
                <ExitToAppOutlinedIcon className="icon" />
                <span>Logout</span>
              </button>
            </Form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
