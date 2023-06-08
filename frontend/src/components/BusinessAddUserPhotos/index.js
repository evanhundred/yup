import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";

const BusinessAddUserPhotos = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {};
  if (!business) return null;

  return (
    <div className="everything-container">
      <p className="add-photos-title">
        <Link to={`/businesses/${business.id}`}>{business.name}: </Link>
        Add Photos
      </p>
      <p>
        <Link to={`/biz-photos/${business.id}`}>View all photos</Link>
      </p>
      <div className="input-box">
        <input type="file" name="file" onChange={changeHandler} />
        {isFilePicked ? (
          <div className="file-metadata">
            <p>{`Filename: ${selectedFile.name}`} </p>
            <p>{`Filetype: ${selectedFile.type}`} </p>
            <p>{`Size in bytes: ${selectedFile.size}`} </p>
            <p>
              {`lastModifiedDate: ${selectedFile.lastModifiedDate.toLocaleDateString()}`}{" "}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div className="submit-button">
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default BusinessAddUserPhotos;
