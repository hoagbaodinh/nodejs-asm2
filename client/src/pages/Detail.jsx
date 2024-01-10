import {
  Link,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./detail.scss";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import Reserve from "../components/Reserve";
import { dayDiff } from "../util/dayDiff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const DetailPage = () => {
  const { id } = useParams();
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();

  // State
  const [openModal, setOpenModal] = useState(false);

  // Get data hotel by Id
  const { data, loading } = useFetch(`hotels/get-hotel/${id}`);

  // Context
  const { dates, roomInfo } = useContext(SearchContext);

  // Tính số ngày user đặt
  const days = dayDiff(dates[0].endDate, dates[0].startDate);

  // Click Handler
  const handleClick = (e) => {
    e.preventDefault();
    // Thông báo nêu người dùng chưa đăng nhập
    if (!user) {
      window.alert("You have to login first");
      return navigate("/login");
    }
    setOpenModal(true);
  };

  return (
    <>
      {/* Main */}
      <main className="main">
        {loading
          ? "Loading..."
          : data && (
              <>
                {/* Hotel Information */}
                <section className="hotelInfo">
                  <div className="hotelInfoContent container">
                    <h2 className="hotelInfoName">{data?.name}</h2>
                    <p className="hotelInfoAddress">
                      <FontAwesomeIcon icon={faLocationDot} />
                      {data?.address}
                    </p>
                    <p className="hotelInfoDistance">
                      Excellent location – {data?.distance}m from center{" "}
                    </p>
                    <p className="hotelInfoPrice">
                      Book a stay over ${data?.cheapestPrice} at this property
                      and get a free airport taxi
                    </p>
                    <div className="hotelInfoImgs">
                      {/* Chạy vòng lặp để render hotel photos */}
                      {data?.photos?.map((photo) => (
                        <img
                          key={photo}
                          className="hotelInfoImg"
                          src={photo}
                          alt=""
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleClick}
                      className="btn-primary hotelInfoBtn"
                    >
                      Reserve or Book Now!
                    </button>
                  </div>
                </section>

                {/* Hotel Details */}
                <section className="hotelDetails">
                  <div className="hotelDetailsContainer container">
                    <div className="hotelDetailsContent">
                      <h2 className="hotelDetailsTitle">{data?.title}</h2>
                      <p className="hotelDetailsDescription">{data?.desc}</p>
                    </div>
                    <div className="hotelPromo">
                      <p className="hotelPromoPrice">
                        <span>
                          $
                          {data?.cheapestPrice *
                            (days || 1) *
                            Number(roomInfo.room)}
                        </span>{" "}
                        ({days || 1} nights)
                      </p>

                      <button
                        onClick={handleClick}
                        className="btn-primary hotelPromoBtn"
                      >
                        Reserve or Book Now!
                      </button>
                    </div>
                  </div>

                  {/* Reserve */}
                  {openModal && (
                    <Reserve
                      setOpen={setOpenModal}
                      hotelId={id}
                      datesRange={dates}
                    />
                  )}
                </section>
              </>
            )}
      </main>
    </>
  );
};

export default DetailPage;
