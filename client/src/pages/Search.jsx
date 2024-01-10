import { useLocation } from "react-router-dom";

import "./search.scss";
import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../components/SearchItem";
import { SearchContext } from "../context/SearchContext";

const SearchPage = () => {
  // States
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.roomInfo);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // Lấy thông tin các hotel dựa theo các yêu cầu
  const { data, loading, reFetch } = useFetch(
    `hotels/get-hotels?city=${destination}&min=${min || 0}&max=${
      max || 999
    }&dates=${JSON.stringify(date)}&rooms=${options.room}`
  );

  // Context
  const { dispatch } = useContext(SearchContext);

  const handleClick = (e) => {
    e.preventDefault();
    reFetch();
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, dates: date, roomInfo: options },
    });
  };

  return (
    <main className="main">
      <div className="searchContainer container">
        {/* Sidebar */}
        <div className="searchSidebar">
          <div className="searchSidebarContent">
            <h2 className="searchSidebarTitle">Search</h2>
            <div className="searchSidebarItem">
              <label>Destination</label>
              <input
                className="searchSidebarInput"
                type="text"
                name="checkin"
                value={destination}
                placeholder="destination"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="searchSidebarItem">
              <label>CheckIn Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="searchSidebarItem">
              <label>Options</label>
              <div className="searchSidebarOptions">
                <div className="searchSidebarOptionsItem">
                  <label>Min price per night</label>
                  <input
                    type="number"
                    name="min-price"
                    onChange={(e) => setMin(e.target.value)}
                    className="searchSidebarOptionsInput"
                  />
                </div>
                <div className="searchSidebarOptionsItem">
                  <label>Max price per night</label>
                  <input
                    type="number"
                    name="max-price"
                    onChange={(e) => setMax(e.target.value)}
                    className="searchSidebarOptionsInput"
                  />
                </div>
                <div className="searchSidebarOptionsItem">
                  <label>Adult</label>
                  <input
                    type="number"
                    className="searchSidebarOptionsInput"
                    name="adult-num"
                    value={options.adult}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        adult: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="searchSidebarOptionsItem">
                  <label>Children</label>
                  <input
                    type="number"
                    className="searchSidebarOptionsInput"
                    name="child-num"
                    value={options.children}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        children: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="searchSidebarOptionsItem">
                  <label>Room</label>
                  <input
                    type="number"
                    className="searchSidebarOptionsInput"
                    name="room-num"
                    value={options.room}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        room: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick} className=" btn-primary">
              Search
            </button>
          </div>
        </div>

        {/* Import Component SearchResult*/}
        <div className="searchResult">
          {loading ? (
            "Loading..."
          ) : (
            <>
              {data?.map((item) => (
                <SearchItem item={item} key={item._id} />
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
