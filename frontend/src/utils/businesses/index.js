export const newBusiness = () => {
  // stub:

  const keysArray = [
    "about",
    "address",
    "category",
    "city",
    "country",
    "countryCode",
    "name",
    "neighborhood",
    "phone",
    "state",
    "zipcode"
  ];

  // full business:

  // const keysArray = [
  //   "about",
  //   "address",
  //   "category",
  //   "city",
  //   "closedAt",
  //   "country",
  //   "countryCode",
  //   "latitude",
  //   "longitude",
  //   "name",
  //   "neighborhood",
  //   "openAt",
  //   "phone",
  //   "placeId",
  //   "price",
  //   "state",
  //   "website",
  //   "zipcode"
  // ];

  const data = {};
  while (keysArray.length !== 0) {
    const key = keysArray.pop();
    data[[key]] = "";
  }
  data.stub = "true";

  return data;
};
