import React from "react";
import { Link } from "react-router-dom";
import "./footerItem.scss";

const FooterItem = (props) => {
  return (
    <div className="footerItem">
      {props.value.map((data) => (
        <Link key={data} className="footerLink" to="#">
          {data}
        </Link>
      ))}
    </div>
  );
};

export default FooterItem;
