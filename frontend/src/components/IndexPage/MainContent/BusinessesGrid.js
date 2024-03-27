import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusinesses, getBusinesses } from '../../../store/businesses';
import Loading from '../../Loading';
import photoBlank from '../../../assets/images/broccoli.png';

const BusinessesGrid = ({ businessesToLoad }) => {
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  if (!businesses || !businesses.length || businesses[0].status === 500)
    return <Loading type='small' />;

  const businessesLoaderSlice = businesses.slice(0, businessesToLoad);

  const photoIsPresent = (business) => {
    return business.imageUrls.length > 0;
  };

  const businessCardImage = (business) => {
    if (photoIsPresent(business)) return business.imageUrls[1];
    return photoBlank;
  };

  const businessesBlock = businessesLoaderSlice.map((business, idx) => {
    return (
      <div className='business-card' key={idx}>
        <div
          className={`card-image${
            photoIsPresent(business) ? '' : ' photo-blank'
          }`}
        >
          <Link to={`/businesses/${business.id}`}>
            <img src={businessCardImage(business)} alt={business.name} />
          </Link>
        </div>

        <div className='info-section'>
          <h3>{business.name}</h3>
        </div>
      </div>
    );
  });

  return <div id='business-block'>{businesses ? businessesBlock : ''}</div>;
};

export default BusinessesGrid;
