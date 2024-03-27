import CoffeeShop from '../../../assets/devocion_bar.jpeg';

const PhotoBlock = () => {
  return (
    <>
      <div className='image-height-reset' />
      <div className='image-container'>
        <img src={CoffeeShop} alt='espresso bar at Devoción café' />
      </div>
    </>
  );
};

export default PhotoBlock;
