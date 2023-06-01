import { useParams } from "react-router-dom";

const BusinessAddUserPhotos = () => {
  const { businessId } = useParams();
  console.log(businessId);

  return <div className="everything-container">{businessId}</div>;
};

export default BusinessAddUserPhotos;
