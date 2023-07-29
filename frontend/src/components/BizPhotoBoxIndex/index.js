import { useState, useEffect } from "react";

const BizPhotoBoxIndex = () => {
  const [bizPhotoBoxes, setBizPhotoBoxes] = useState([]);

  useEffect(() => {
    const fetchBizPhotoBoxes = async () => {
      const res = await fetch("/api/biz_photo_boxes");
      setBizPhotoBoxes(await res.json());
    };
    fetchBizPhotoBoxes();
  }, []);

  return (
    <div className="biz-photo-boxes">
      <ul>
        {bizPhotoBoxes.map((box) => {
          return (
            <li key={box.id}>
              <h2>{box.title}</h2>
              <img src={box.photos[0]} alt="delicous box" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BizPhotoBoxIndex;
