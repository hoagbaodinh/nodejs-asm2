import React from "react";
import Property from "../components/Property";
import City from "../components/City";
import Hotel from "../components/Hotel";
import SearchBar from "../components/SearchBar";
import { Link, useRouteLoaderData } from "react-router-dom";

import "./home.scss";
const HomePage = () => {
  const user = useRouteLoaderData("root");

  return (
    <>
      <main className="main">
        <div className="heroContainer">
          <div className="heroBanner container">
            <h1>A lifetime of discounts? It's Genius.</h1>
            <p className="heroBannerSubtitle">
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free account
            </p>
            {!user && (
              <Link to={"/login"} className="btn-primary heroBannerBtn">
                Sign in / Register
              </Link>
            )}
          </div>
        </div>
        <div className="container relative">
          <SearchBar />
        </div>
        {/* City Section */}
        <City />
        {/* Property Section */}
        <Property />
        {/* Hotel Section */}
        <Hotel />
      </main>
    </>
  );
};

export default HomePage;
