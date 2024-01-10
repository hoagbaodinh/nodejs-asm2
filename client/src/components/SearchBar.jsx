import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchContext } from "../context/SearchContext";
import "./searchbar.scss";

const SearchBar = (props) => {
  // States
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [roomInfo, setRoomInfo] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  // Context
  const { dispatch } = useContext(SearchContext);

  // Option Handler
  const handleOption = (name, operation) => {
    setRoomInfo((prev) => {
      return {
        ...prev,
        [name]:
          operation === "increase" ? roomInfo[name] + 1 : roomInfo[name] - 1,
      };
    });
  };

  // Search Handler
  const handleSearch = () => {
    // dispatch search context
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, dates, roomInfo },
    });
    // Chuyển hướng sang SearchPage và gửi theo state
    navigate("/search", { state: { destination, dates, roomInfo } });
  };

  return (
    <form className="searchbar">
      {/* Input Place to go */}
      <div className="searchbarItem">
        <FontAwesomeIcon icon={faBed} className="searchbarIcon" />
        <input
          type="text"
          className="searchbarInput "
          placeholder="Where are you going?"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="searchbarItem">
        <FontAwesomeIcon icon={faCalendarDays} className="searchbarIcon" />
        {/* Thêm DateRangeComp */}
        <span
          onClick={() => setOpenDate(!openDate)}
          className="searchbarText"
        >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
          dates[0].endDate,
          "MM/dd/yyyy"
        )}`}</span>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className="date"
            minDate={new Date()}
          />
        )}
      </div>

      {/* input số lượng người đặt phòng */}
      <div className="searchbarItem">
        <FontAwesomeIcon icon={faPerson} className="searchbarIcon" />
        <span
          className="searchbarText"
          onClick={() => setOpenOptions(!openOptions)}
        >
          {`${roomInfo.adult} adult - ${roomInfo.children} children - ${roomInfo.room} room`}
        </span>

        {openOptions && (
          <div className="options">
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
                <button
                  disabled={roomInfo.adult <= 1}
                  className="optionCounterButton"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOption("adult", "decrease");
                  }}
                >
                  -
                </button>
                <span className="optionCounterNumber">{roomInfo.adult}</span>
                <button
                  className="optionCounterButton"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOption("adult", "increase");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            {/* Children */}
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
                <button
                  disabled={roomInfo.children <= 1}
                  className="optionCounterButton"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOption("children", "decrease");
                  }}
                >
                  -
                </button>
                <span className="optionCounterNumber">{roomInfo.children}</span>
                <button
                  className="optionCounterButton"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOption("children", "increase");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            {/* Rooms */}
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
                <button
                  disabled={roomInfo.room <= 1}
                  className="optionCounterButton"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOption("room", "decrease");
                  }}
                >
                  -
                </button>
                <span className="optionCounterNumber">{roomInfo.room}</span>
                <button
                  className="optionCounterButton"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOption("room", "increase");
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Nút chuyển hướng */}
      <button type="button" className="btn-primary" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
