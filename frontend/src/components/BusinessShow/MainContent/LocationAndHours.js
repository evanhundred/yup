const LocationAndHours = ({ business }) => {
  // const urlifiedBizName = business.name;
  const urlifiedBizCoords = `${business.latitude}%2C${business.longitude}`;
  // let googleMapParams = `query=${urlifiedBizName}&query_place_id=${business.placeId}`;
  let googleMapParams = `query=${urlifiedBizCoords}&query_place_id=${business.placeId}`;

  // const PCT2C = "%2C";
  const comma = ",";
  const space = " ";

  const urlifyBizName = () => {
    const nameArray = business.name.split(" ");
    // console.log(nameArray);

    const cityArray = business.city.split(" ");
    const stateArray = business.state.split(" ");

    const locationArray = cityArray.concat(comma).concat(stateArray);
    // console.log(locationArray);
    // console.log(nameArray.concat(locationArray));
    const wordsArray = nameArray.concat(comma).concat(locationArray);
    // console.log(wordsArray);
    const filteredWordsArray = wordsArray
      .map((word, idx) => {
        if (!word) return "";

        let result = [];
        // let plus = "+";

        if (idx === wordsArray.length - 1) {
          result.push(word);
        } else {
          if (wordsArray[idx + 1] === comma) {
            result.push(word);
          } else {
            result.push(word);
            result.push(space);
          }
        }

        return result;
        // if (word.match(/[a-zA-Z0-9]/g))
        //   return word.match(/[a-zA-Z0-9]/g).join("");
        // return "";
      })
      .flat();

    const urlifiedBizName = filteredWordsArray.join("");
    return urlifiedBizName;
    // console.log(filteredWordsArray.join(""));
    // const finalForm = filteredWordsArray.join("+");
    // console.log(finalForm);
    // return finalForm;
  };

  const urlifiedBizName = encodeURIComponent(urlifyBizName()).replace(
    /'/g,
    "%27"
  );

  // console.log(urlifiedBizName);
  const stubMapParams = `query=${urlifiedBizName}`;

  const isStub = business.stub === "true";
  const mapSearchUrl = (params) =>
    `https://www.google.com/maps/search/?api=1&${params}`;
  const getParams = isStub ? stubMapParams : googleMapParams;

  // const mapSearchUrl = `https://maps.google.com/?ll=${business.latitude},${business.longitude}`;
  const neighborhoodString = business.neighborhood;
  // const neighborhoodString = business ? business.neighborhood : "text";

  return (
    <div className={`location card-container${isStub ? " stub" : ""}`}>
      <div className="main-title">
        <h2>Location and Hours</h2>
      </div>

      <div className="main-content-div">
        <div className="left-side-map">
          {!isStub && <img src={business.imageUrls[6]} alt="google maps" />}
          <div className="bottom-left-side">
            <div className="address">
              <a
                href={mapSearchUrl(getParams)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="street-address">{business.address}</h3>
              </a>

              <h4 className="city-state-zip">
                {business.city}, {business.state} {business.zipcode}
              </h4>
              {/* <p>{business.neighborhood}</p> */}
              <p>{neighborhoodString}</p>
            </div>

            <div className="get-directions-container">
              <div className="get-directions-button">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={mapSearchUrl(getParams)}
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hours-div">
          <div className="day-container">
            <div className="day-name">Mon</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Tue</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Wed</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Thu</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Fri</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Sat</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Sun</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          {/* <a href="#">
            <div className="edit-info-button">
              <i className="fa-solid fa-pencil"></i>
              <div>Edit Business info</div>
            </div>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default LocationAndHours;
