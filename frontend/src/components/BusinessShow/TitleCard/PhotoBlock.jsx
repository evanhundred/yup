const PhotoBlock = ({ business }) => {
  // refactor default images to return a hash instead of array
  // defaultImages = {
  //   0: 'url',
  //   1: 'url',
  //   ...
  // }
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

  // refactor getImage function to return hash of image metadata, instead of array
  // hash structure:
  // {
  //   imageType: imageUrl
  // }
  const getImage = (imageType) => {
    if (business.stub === 'true') {
      return defaultImages[`${imageType}.jpeg`];
    }
    return business.imageUrls[imageType];
  };

  return (
    <div className={`business-image-container${business.stub === 'true' ? ' stub' : ''}`}>
      <div className='business-image one'>
        <img src={getImage(0)} alt='delicious items' />
      </div>

      <div className='business-image two'>
        <img src={getImage(4)} alt='fantastic store' />
      </div>

      <div className='business-image three'>
        <img src={getImage(1)} alt='more delicious items' />
      </div>

      <div className='business-image four'>
        <img src={getImage(2)} alt='more delicious deliciousness' />
      </div>
      <div className='business-image five'>
        <img src={getImage(3)} alt='more more delicious deliciousness' />
      </div>
    </div>
  );
};

export default PhotoBlock;
