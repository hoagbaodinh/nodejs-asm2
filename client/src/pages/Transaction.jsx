import "./transaction.scss";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { format } from "date-fns";

const Transaction = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`transaction/user-transaction/${id}`);

  // Format Index
  const formatIndex = (index) => {
    return index < 10 ? "0" + index : index;
  };

  return (
    <main>
      <div className="transactionContainer container">
        <h3 className="transactionTitle">Your Transactions</h3>
        {loading ? (
          "Loading..."
        ) : data.length === 0 ? (
          "No Transaction Found"
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, i) => (
                <tr key={item._id}>
                  <td>{formatIndex(i + 1)}</td>
                  <td>{item.hotel.name}</td>
                  <td>
                    {item.room
                      .map((r) => r.roomNumber)
                      .flat(1)
                      .join(", ")}
                  </td>
                  <td>{`${format(
                    new Date(item.dateStart),
                    "dd/MM/yyyy"
                  )} - ${format(new Date(item.dateEnd), "dd/MM/yyyy")}`}</td>
                  <td>${item.price} </td>
                  <td>{item.payment}</td>
                  <td>
                    <span className={`transactionStatus ${item.status}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default Transaction;
