import React from "react";
import { Link } from "react-router-dom";

const SubscribeForm = () => {
  return (
    <div className="subscribe-form">
      <h3 className="subscribe-title">Save time, save money!</h3>
      <p className="subscribe-subtitle">
        Sign up and we'll send the best deals to you
      </p>
      <div>
        <input
          className="subscribe-input"
          placeholder="Your Email"
          type="text"
        />
        <Link to="#" className="btn-primary subscribe-btn">
          Subscribe
        </Link>
      </div>
    </div>
  );
};

export default SubscribeForm;
