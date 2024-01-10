import "./newRoom.scss";
import { useEffect, useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewRoom = ({ edit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState("");

  // Get Hotels Data
  const { data, loading } = useFetch(`hotels/all-hotels`);

  useEffect(() => {
    // Set default value nếu mode đang là edit
    const fetchHotel = async () => {
      const res = await axios.get(
        `http://localhost:5050/api/rooms/get-room/${id}`
      );
      setInfo(res.data);
      setRooms(res.data.roomNumbers.join(", "));
    };
    if (edit) {
      fetchHotel();
    } else {
      setInfo({});
      setRooms("");
    }
  }, [edit, id]);

  // Input Change Handler
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Format Roomnumbers data
    const roomNumbers = rooms.split(",").map((r) => r.trim());
    const newRoom = {
      ...info,
      roomNumbers,
    };

    try {
      if (edit) {
        await axios.put(
          `http://localhost:5050/api/rooms/update-room/${id}`,
          newRoom
        );
      } else {
        await axios.post(
          `http://localhost:5050/api/rooms/add-room/${hotelId}`,
          newRoom
        );
      }

      navigate("/rooms");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="top">
        <h1>{edit ? "Edit" : "Add New"} Room</h1>
      </div>
      <div className="bottom">
        <form onSubmit={handleSubmit}>
          {/* Inputs */}
          {roomInputs.map((input) => (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input
                type={input.type}
                onChange={handleChange}
                placeholder={input.placeholder}
                value={info[`${input.id}`] || ""}
                id={input.id}
                required
              />
            </div>
          ))}
          {/* Rooms */}
          <div className="formInput">
            <label>Rooms</label>
            <textarea
              onChange={(e) => setRooms(e.target.value)}
              value={rooms}
              placeholder="101, 102,..."
              required
            ></textarea>
          </div>
          {/* Hotel */}
          {!edit && (
            <div className="formInput">
              <label>Choose a hotel</label>
              <select
                id="hotelId"
                onChange={(e) => setHotelId(e.target.value)}
                required
              >
                {loading
                  ? "Loading..."
                  : data &&
                    data.map((hotel) => (
                      <option value={hotel._id} key={hotel._id}>
                        {hotel.name}
                      </option>
                    ))}
              </select>
            </div>
          )}
          <button>Send</button>
        </form>
      </div>
    </>
  );
};

export default NewRoom;
