import { format } from "date-fns";
import useFetch from "../../hooks/useFetch";
import "./transaction.scss";
import { DataGrid } from "@mui/x-data-grid";

const TransactionPage = ({ pSize, title }) => {
  // Get data
  const { data, loading } = useFetch(`transaction/all-transactions`);

  // Row DataGrid
  const row = data.map((item) => ({
    id: item._id,
    user: item.user.username,
    hotel: item.hotel.name,
    room: item.room
      .map((r) => r.roomNumber)
      .flat(1)
      .join(", "),
    date: `${format(new Date(item.dateStart), "dd/MM/yyyy")} - ${format(
      new Date(item.dateEnd),
      "dd/MM/yyyy"
    )}`,
    price: `$${item.price}`,
    payment: item.payment,
    status: item.status,
  }));

  // Columns DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "User",
      width: 100,
    },

    {
      field: "hotel",
      headerName: "Hotel",
      width: 250,
    },
    {
      field: "room",
      headerName: "Room",
      width: 120,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "payment",
      headerName: "Payment Method",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`status ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];

  return (
    <div className="transaction">
      <div className="transactionTitle">{title}</div>
      {loading ? (
        "Loading..."
      ) : data.length === 0 ? (
        "No Transaction Found"
      ) : (
        <DataGrid
          className="datagrid"
          rows={row}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: pSize },
            },
          }}
          pageSizeOptions={[pSize]}
          checkboxSelection
          getRowId={(row) => row.id}
        />
      )}
    </div>
  );
};

export default TransactionPage;
