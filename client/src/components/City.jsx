import DaNangImg from "../assets/Da Nang.jpg";
import HanoiImg from "../assets/Ha Noi.jpg";
import HCMImg from "../assets/HCM.jpg";
import "./city.scss";
import useFetch from "../hooks/useFetch";

const City = () => {
  // Get Data
  const { data, loading } = useFetch("hotels/prop-by-city");

  return (
    <section className="city">
      <div className="cityContent container">
        {loading
          ? "Loading..."
          : data && (
              <>
                <div className="cityItem">
                  <img className="cityImg" src={HanoiImg} alt="Ha Noi" />
                  <div className="cityDescription">
                    <h3 className="cityName">Ha Noi</h3>
                    <p className="citySubtitle">{data?.Hanoi} properties</p>
                  </div>
                </div>
                <div className="cityItem">
                  <img className="cityImg" src={HCMImg} alt="HCM" />
                  <div className="cityDescription">
                    <h3 className="cityName">Ho Chi Minh</h3>
                    <p className="citySubtitle">{data?.Hcm} properties</p>
                  </div>
                </div>
                <div className="cityItem">
                  <img className="cityImg" src={DaNangImg} alt="Da Nang" />
                  <div className="cityDescription">
                    <h3 className="cityName">Da Nang</h3>
                    <p className="citySubtitle">{data?.Danang} properties</p>
                  </div>
                </div>
              </>
            )}
      </div>
    </section>
  );
};

export default City;
