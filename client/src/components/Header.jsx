import React from "react";
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Link, useRouteLoaderData } from "react-router-dom";
import "./header.scss";

const Header = (props) => {
  const user = useRouteLoaderData("root");

  return (
    <header className="header">
      <div className="headerContent container">
        <div className="headerTop">
          <div className="headerLogo">
            <Link to={"/"}>Booking Website</Link>
          </div>

          <div className="headerBtns">
            {!user && (
              <>
                <Link to={"/register"} className="headerBtn">
                  Register
                </Link>
                <Link to={"/login"} className="headerBtn">
                  Login
                </Link>
              </>
            )}
            {user && (
              <>
                <span className="headerUsername">{user?.username}</span>
                <Link to={`/transaction/${user?._id}`} className="headerBtn">
                  Transaction
                </Link>
                <Form action="/logout" method="post">
                  <button className="headerBtn">Logout</button>
                </Form>
              </>
            )}
          </div>
        </div>

        <div className="headerNavbar">
          <ul className="navbarList">
            <li className="navbarItem">
              <Link className="navbarLink active" to={"/"}>
                <FontAwesomeIcon icon={faBed} />
                Stays
              </Link>
            </li>
            <li className="navbarItem">
              <Link className="navbarLink " to={"/"}>
                <FontAwesomeIcon icon={faPlane} />
                Flights
              </Link>
            </li>
            <li className="navbarItem">
              <Link className="navbarLink " to={"/"}>
                <FontAwesomeIcon icon={faCar} />
                Car rentals
              </Link>
            </li>
            <li className="navbarItem">
              <Link className="navbarLink " to={"/"}>
                <FontAwesomeIcon icon={faBed} />
                Attractions
              </Link>
            </li>
            <li className="navbarItem">
              <Link className="navbarLink " to={"/"}>
                <FontAwesomeIcon icon={faTaxi} />
                Airport taxis
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
