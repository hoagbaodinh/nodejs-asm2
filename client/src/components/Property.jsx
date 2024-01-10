import "./property.scss";
import useFetch from "../hooks/useFetch";

const Property = (props) => {
  const { data, loading } = useFetch("hotels/prop-by-type");

  return (
    <section className="propertyType">
      <div className="container">
        <h2 className="section-title">Browse by property type</h2>
        {loading
          ? "Loading..."
          : data && (
              <div className="propertyTypeContent">
                <div className="propertyTypeItem">
                  <img
                    className="propertyTypeImg"
                    src="./images/type_1.webp"
                    alt="type"
                  />
                  <h3 className="propertyTypeTitle">Hotels </h3>
                  <p className="propertyTypeCount">{data?.hotel} hotels </p>
                </div>
                <div className="propertyTypeItem">
                  <img
                    className="propertyTypeImg"
                    src="./images/type_2.jpg"
                    alt="type"
                  />
                  <h3 className="propertyTypeTitle">Apartments </h3>
                  <p className="propertyTypeCount">
                    {data?.apartment} apartments{" "}
                  </p>
                </div>
                <div className="propertyTypeItem">
                  <img
                    className="propertyTypeImg"
                    src="./images/type_3.jpg"
                    alt="type"
                  />
                  <h3 className="propertyTypeTitle">Resorts </h3>
                  <p className="propertyTypeCount">{data?.resort} resort </p>
                </div>
                <div className="propertyTypeItem">
                  <img
                    className="propertyTypeImg"
                    src="./images/type_4.jpg"
                    alt="type"
                  />
                  <h3 className="propertyTypeTitle">Villas </h3>
                  <p className="propertyTypeCount">{data?.villa} villa </p>
                </div>
                <div className="propertyTypeItem">
                  <img
                    className="propertyTypeImg"
                    src="./images/type_5.jpg"
                    alt="type"
                  />
                  <h3 className="propertyTypeTitle">Cabins </h3>
                  <p className="propertyTypeCount">{data?.cabin} cabin </p>
                </div>
              </div>
            )}
      </div>
    </section>
  );
};

export default Property;
