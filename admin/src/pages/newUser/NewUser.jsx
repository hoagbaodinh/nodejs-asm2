import { useEffect, useState } from "react";
import { userInputs } from "../../formSource.js";
import "./newUser.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewUser = ({ edit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [info, setInfo] = useState({});

  // Nếu edit thì get data theo Id
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5050/api/users/get-user/${id}`
      );
      setInfo(res.data);
    };
    if (edit) {
      fetchUser();
    } else {
      setInfo({});
    }
  }, [edit, id]);

  // Handle Change Input
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        ...info,
      };
      if (edit) {
        await axios.put(
          `http://localhost:5050/api/users/update-user/${id}`,
          newUser
        );
      } else {
        await axios.post("http://localhost:5050/api/users/add-user", newUser);
      }
      navigate("/users");
    } catch (error) {
      if (error.response) {
        window.alert(error.response.data);
        return;
      }
    }
  };
  return (
    <>
      <div className="top">
        <h1>{edit ? "Edit" : "Add New"} User</h1>
      </div>
      <div className="bottom">
        <form onSubmit={handleSubmit}>
          {/* Input */}
          {userInputs.map((input) => (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                value={info[`${input.id}`] || ""}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          {/* IsAdmin */}
          <div className="formInput">
            <label>Admin</label>
            <select id="isAdmin" onChange={handleChange} value={info.isAdmin}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          {/* Submit */}
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default NewUser;
