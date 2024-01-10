import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./error.scss";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const ErrorPage = () => {
  return (
    <div className="errorContainer">
      <h1>Page not found</h1>
      <Link to={"/"}>
        <FontAwesomeIcon icon={faAngleLeft} />
        Back to homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
