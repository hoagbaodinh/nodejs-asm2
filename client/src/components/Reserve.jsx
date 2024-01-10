import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "./reserve.scss";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { dayDiff } from "../util/dayDiff";
import axios from "axios";

const Reserve = ({ hotelId, datesRange }) => {
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();
  const { id } = useParams();

  // State
  const [date, setDate] = useState(
    datesRange || [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]
  );
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNum, setPhoneNum] = useState(user?.phoneNumber || "");
  const [cardNum, setCardNum] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [price1Day, setPrice1Day] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Lay danh sach phong cua Hotel
  const { data, loading } = useFetch(`hotels/room/${hotelId}`);

  // Function lay tung ngay cua range [day1, day2 ,...]
  const getDateRange = (start, end) => {
    const date = new Date(start);
    const endDate = new Date(end);

    let dates = [];

    while (date <= endDate) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const allDates = getDateRange(date[0].startDate, date[0].endDate);

  // Lay so ngay ma user dat
  const days = dayDiff(date[0].endDate, date[0].startDate);

  // Function kiểm tra phòng trống theo roomNumber
  const isAvailable = (room, roomNum) => {
    let isAvailable = true;
    const roomN = room.unavailableDates.find((r) => r.roomNumber === roomNum);
    if (roomN?.date.some((d) => allDates.includes(new Date(d).getTime()))) {
      isAvailable = false;
    }

    return isAvailable;
  };

  // Lấy ra các phòng đã chọn
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    const roomId = value.split(",")[1];
    const room = data.find((room) => room._id === roomId);
    checked
      ? setPrice1Day((prev) => prev + room.price)
      : setPrice1Day((prev) => prev - room.price);
  };

  // set Tong bill
  useEffect(() => {
    setTotalBill(price1Day * days);
  }, [price1Day, days]);

  const handleClick = async (e) => {
    e.preventDefault();
    // Các input không được để trống
    if (!cardNum) {
      return window.alert("Please enter card number");
    }
    if (selectedRooms.length === 0) {
      return window.alert("Please select rooms");
    }
    if (!paymentMethod) {
      return window.alert("Please select payment method");
    }
    setSubmitting(true);
    const transaction = {
      user: user._id,
      hotelId: id,
      room: selectedRooms,
      startDate: date[0].startDate,
      endDate: date[0].endDate,
      price: totalBill,
      paymentMethod: paymentMethod === "card" ? "Credit Card" : "Cash",
    };
    try {
      // update ngay da dat trong room
      await Promise.all(
        selectedRooms.map((room) => {
          const res = axios.put(
            `http://localhost:5050/api/rooms/availability/${
              room.split(",")[1]
            }`,
            {
              dates: allDates,
              roomNumber: room.split(",")[0],
            }
          );
          return res.data;
        })
      );
      // them giao dich vao transaction
      await axios.post(
        "http://localhost:5050/api/transaction/add-transaction",
        transaction
      );
      setSubmitting(false);
      window.alert("Successfully place your booking!");
      navigate(`/transaction/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reserveContainer container">
      {/* Dates */}
      <div className="reserveDates">
        <h3 className="reserveTitle">Dates</h3>
        <DateRange
          onChange={(item) => setDate([item.selection])}
          minDate={new Date()}
          ranges={date}
        />
      </div>

      {/* Reserver Info */}
      <div className="reserveInfo">
        <h3 className="reserveTitle">Reserve Info</h3>
        {/* Full Name */}
        <div className="reserveInfoItem">
          <label>Your Full Name:</label>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        {/* Email */}
        <div className="reserveInfoItem">
          <label>Your email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Phone Number */}
        <div className="reserveInfoItem">
          <label>Your Phone Number:</label>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </div>
        {/* Card Number */}
        <div className="reserveInfoItem">
          <label>Your Identity Card Number:</label>
          <input
            type="text"
            placeholder="Card Number"
            onChange={(e) => setCardNum(e.target.value)}
          />
        </div>
      </div>
      {/* Select Rooms */}
      <div className="reserveRooms">
        <h3 className="reserveTitle">Select Rooms</h3>
        {loading
          ? "Loading..."
          : data && (
              <>
                {data?.map((room) => (
                  <div className="reserveRoomItem" key={room._id}>
                    <div className="reserveRoomInfo">
                      <div className="reserveRoomTitle">{room.title}</div>
                      <div className="reserveRoomDesc">{room.desc}</div>
                      <div className="reserveRoomMax">
                        Max people: <span>{room.maxPeople}</span>
                      </div>
                      <div className="reserveRoomPrice">${room.price}</div>
                    </div>
                    <div className="reserveSelectRooms">
                      {room.roomNumbers.map((roomNum, i) => (
                        <div className="room" key={roomNum}>
                          <label>{roomNum}</label>
                          <input
                            type="checkbox"
                            value={`${roomNum},${room._id}`}
                            onChange={handleSelect}
                            disabled={!isAvailable(room, roomNum)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
      </div>

      {/* Payment */}
      <div className="reservePayment">
        <p className="reserveBill">Total Bill: ${totalBill}</p>
        <select
          className="reservePaymentSelect"
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="cash">Cash</option>
          <option value="card">Credit Card</option>
        </select>
        {/* Submit */}
        <button
          className="reservePaymentBtn btn-primary"
          onClick={handleClick}
          disabled={submitting}
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default Reserve;
