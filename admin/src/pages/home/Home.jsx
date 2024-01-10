import "./home.scss";
import React from "react";
import Widget from "../../components/widget/Widget";
import TransactionPage from "../transaction/Transaction";

const Home = () => {
  return (
    <>
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>

      <div className="listContainer">
        <TransactionPage pSize={8} title="Latest Transactions" />
      </div>
    </>
  );
};

export default Home;
