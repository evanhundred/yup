export const newBusiness = () => {
  const keysArray = [
    "about",
    "address",
    "category",
    "city",
    "closedAt",
    "country",
    "countryCode",
    "latitude",
    "longitude",
    "name",
    "neighborhood",
    "openAt",
    "phone",
    "placeId",
    "price",
    "state",
    "website",
    "zipcode"
  ];

  const data = {};
  while (keysArray.length !== 0) {
    const key = keysArray.pop();
    data[[key]] = "";
  }

  return data;
};
