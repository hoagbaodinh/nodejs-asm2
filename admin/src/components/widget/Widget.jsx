import "./widget.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import useFetch from "../../hooks/useFetch";

const Widget = ({ type }) => {
  let dataWidget;

  // Dựa vào type truyền vào để xác định loại Widget
  switch (type) {
    case "user":
      dataWidget = {
        title: "USERS",
        isMoney: false,
        url: "users/num-of-users",
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "order":
      dataWidget = {
        title: "ORDERS",
        isMoney: false,
        url: "transaction/num-of-transactions",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;
    case "earning":
      dataWidget = {
        title: "EARNINGS",
        isMoney: true,
        url: "transaction/total-earning",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      break;
    case "balance":
      dataWidget = {
        title: "BALANCE",
        url: "transaction/total-earning",
        isMoney: true,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
  }
  const { data, loading } = useFetch(dataWidget.url);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{dataWidget.title}</span>
        <span className="counter">
          {loading ? "Loading.." : `${dataWidget.isMoney ? "$" : ""} ${data}`}
        </span>
      </div>
      <div className="right">{dataWidget.icon}</div>
    </div>
  );
};

export default Widget;
