const PhotoBlock = ({ business }) => {
  let defaultImages;
  if (business.stub === 'true') {
    const importAll = (stubImages) => {
      let images = {};
      stubImages.keys().map((item) => {
        return (images[item.replace('./', '')] = stubImages(item));
      });
      return images;
    };
    defaultImages = importAll(require.context('../../../assets/images/stub/', false, /\S/));
  }

  const getImage = (imageType) => {
    if (business.stub === 'true') {
      return defaultImages[`${imageType}.jpeg`];
    }
    return business.photosMetadata[imageType];
  };

  return (
    <div className={`business-image-container${business.stub === 'true' ? ' stub' : ''}`}>
      <div className='business-image one'>
        <img src={getImage('photo1')} alt='delicious items' />
      </div>

      <div className='business-image two'>
        <img src={getImage('photo3')} alt='fantastic store' />
      </div>

      <div className='business-image three'>
        <img src={getImage('photo2')} alt='more delicious items' />
      </div>

      <div className='business-image four'>
        <img src={getImage('photo5')} alt='more delicious deliciousness' />
      </div>
      <div className='business-image five'>
        <img src={getImage('photo4')} alt='more more delicious deliciousness' />
      </div>
    </div>
  );
};

export default PhotoBlock;
