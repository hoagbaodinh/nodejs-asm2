import React from "react";
import { Link } from "react-router-dom";
import "./searchItem.scss";
const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <div className="searchItemImg">
        <img src={item.photos[0]} alt="" />
      </div>

      <div className="searchItemContent">
        <h2 className="searchItemTitle">{item.name}</h2>
        <p className="searchItemDistance">{item.distance}m from center</p>
        <span className="searchItemTag">Free airport taxi</span>
        <p className="searchItemDescription">
          Studio Apartment with Air conditioning
        </p>
        <p className="searchItemType">{item.desc}</p>
        <p className="searchItemCancelOp">Free cancellation</p>
        <p className="searchItemCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </p>
      </div>

      <div className="searchItemRight">
        <div className="searchItemRating">
          <p>Excellent</p>
          <span>{item.rating}</span>
        </div>

        <div className="searchItemDetail">
          <p className="searchItemPrice">${item.cheapestPrice}</p>
          <p className="searchItemTax">Includes taxes and fees</p>

          <Link
            to={`/detail/${item._id}`}
            className="searchItemCheckBtn btn-primary"
          >
            See availability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
