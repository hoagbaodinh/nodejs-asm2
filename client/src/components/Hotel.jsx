import "./hotel.scss";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const Hotel = () => {
  const { data, loading } = useFetch("hotels/prop-by-rate");

  return (
    <section className="hotel">
      <div className="container">
        <h2 className="section-title">Homes guests love</h2>
        {loading
          ? "Loading..."
          : data && (
              <div className="hotelContent">
                {data?.map((hotel) => (
                  <div className="hotelItem" key={hotel._id}>
                    <div className="hotelImg">
                      <img src={hotel.photos[0]} alt={hotel.name} />
                    </div>
                    <Link className="hotelTitle" to={`/detail/${hotel._id}`}>
                      {hotel.name}
                    </Link>
                    <p className="hotelCity">{hotel.city}</p>
                    <p className="hotelPrice">
                      Stating from ${hotel.cheapestPrice}
                    </p>
                  </div>
                ))}
              </div>
            )}
      </div>
    </section>
  );
};

export default Hotel;
