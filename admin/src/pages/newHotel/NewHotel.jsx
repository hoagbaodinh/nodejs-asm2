import "./newHotel.scss";
import { useEffect, useState } from "react";
import { hotelInputs } from "../../formSource";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHotel = ({ edit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [info, setInfo] = useState({});
  const [photos, setPhotos] = useState([]);
  const [rooms, setRooms] = useState([]);

  // Get Rooms Data
  const { data, loading } = useFetch(`rooms/all-rooms`);

  useEffect(() => {
    // Set default value nếu mode là edit
    const fetchHotel = async () => {
      const res = await axios.get(
        `http://localhost:5050/api/hotels/get-hotel/${id}`
      );
      setInfo(res.data);
      setPhotos(res.data.photos.join("\n"));
      setRooms(res.data.rooms);
    };
    if (edit) {
      fetchHotel();
    } else {
      setInfo({});
      setPhotos([]);
      setRooms([]);
    }
  }, [edit, id]);

  // Change Handler
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Select Rooms Handler
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newHotel = {
        ...info,
        rooms,
        photos: photos.split("\n").map((item) => item.trim()),
      };
      if (edit) {
        await axios.put(
          `http://localhost:5050/api/hotels/update-hotel/${id}`,
          newHotel
        );
      } else {
        await axios.post(
          "http://localhost:5050/api/hotels/add-hotel",
          newHotel
        );
      }
      navigate("/hotels");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="top">
        <h1>{edit ? "Edit" : "Add New"} Hotel</h1>
      </div>
      <div className="bottom">
        <form onSubmit={handleSubmit}>
          {/* Inputs */}
          {hotelInputs.map((input) => (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input
                id={input.id}
                onChange={handleChange}
                type={input.type}
                value={info[`${input.id}`] || ""}
                placeholder={input.placeholder}
                required
              />
            </div>
          ))}
          {/* Images */}
          <div className="formInput">
            <label>Images</label>
            <textarea
              cols="65"
              rows="3"
              value={photos}
              onChange={(e) => setPhotos(e.target.value)}
              placeholder={`image1
image2
...
              `}
              required
            ></textarea>
          </div>
          {/* Featured */}
          <div className="formInput">
            <label htmlFor="featured">Featured</label>
            <select id="featured" onChange={handleChange} value={info.featured}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          {/* Rooms Selector */}
          <div className="selectRooms">
            <label>Rooms</label>
            <select
              id="rooms"
              multiple
              onChange={handleSelect}
              value={rooms}
              required
            >
              {loading
                ? "Loading..."
                : data &&
                  data.map((room) => (
                    <option value={room._id} key={room._id}>
                      {room.title}
                    </option>
                  ))}
            </select>
          </div>
          {/* Submit */}
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default NewHotel;
