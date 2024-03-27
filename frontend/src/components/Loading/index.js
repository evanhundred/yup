import './index.css';

const Loading = ({ type = null }) => {
  const isSmall = type === 'small';

  return (
    <div id='loading-container' className={isSmall && 'small-scale'}>
      <div className='loader' />
    </div>
  );
};

export default Loading;
