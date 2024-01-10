import React from "react";
import dataFooter from "../data/footer.json";
import FooterItem from "./FooterItem";
import "./footer.scss";
import { Link } from "react-router-dom";
const Footer = (props) => {
  return (
    <footer className="footer">
      {/* Import Component SubscribeForm */}
      <div className="subscribeForm">
        <h3 className="subscribeTitle">Save time, save money!</h3>
        <p className="subscribeSubtitle">
          Sign up and we'll send the best deals to you
        </p>
        <div>
          <input
            className="subscribeInput"
            placeholder="Your Email"
            type="text"
          />
          <Link to="#" className="btn-primary subscribeBtn">
            Subscribe
          </Link>
        </div>
      </div>
      {/* chạy vòng lặp dể render từng Footer-item */}
      <div className="footerContent container">
        {dataFooter.map((data) => (
          <FooterItem key={data.col_number} value={data.col_values} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
