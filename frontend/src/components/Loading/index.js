import './index.css';

const Loading = ({ type = null }) => {
  if (type === 'small') {
    return (
      <div id='loading-container' className='small-scale'>
        <div className='loader' />
      </div>
    );
  }
  return (
    <div id='loading-container'>
      <div className='loader' />
    </div>
  );
};

export default Loading;
