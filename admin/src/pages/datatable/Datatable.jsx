import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import axios from "axios";

const Datatable = ({ columns, title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  // State
  const [list, setList] = useState();

  // Get Data
  const { data, loading } = useFetch(`${path}/all-${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  // Delete Handler
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete")) {
        await axios.delete(`http://localhost:5050/api/${path}/${id}`);
        setList(list.filter((item) => item._id !== id));
      } else return;
    } catch (error) {
      window.alert(error.response.data);
    }
  };

  // Action Column
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${path}/edit/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        <Link
          to={`/${path}/new`}
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New{" "}
        </Link>
      </div>
      {loading
        ? "Loading..."
        : list && (
            <DataGrid
              className="dataGrid"
              rows={list}
              columns={columns.concat(actionColumn)}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 9 },
                },
              }}
              pageSizeOptions={[9]}
              getRowId={(row) => row._id}
              checkboxSelection
            />
          )}
    </div>
  );
};

export default Datatable;
