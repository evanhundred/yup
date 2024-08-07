import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../store/businesses';
import { resetMessages, getMessages } from '../../store/messages';
import { useEffect, useState } from 'react';
import MainContent from './MainContent';
import TitleCard from './TitleCard';

const IndexPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);

  // console.log('index');

  const [showRedirectMessage, setShowRedirectMessage] = useState(messages && messages.deleted ? true : false);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const redirectMessageModal = () => {
    const closeModal = async (e = null) => {
      if (e) e.preventDefault();

      await dispatch(resetMessages());

      if (html) html.style.overflow = 'auto';
      setShowRedirectMessage(false);
    };

    const handleOK = () => {
      closeModal();
    };

    return (
      <div id='redirect-message-modal-container'>
        <div className='redirect-message-modal-overlay' onClick={handleOK} />
        <div className='redirect-message-modal-box'>
          <div className='redirect-message-modal-content'>
            <div className='message-container'>
              <h2 className='message'>{messages.deleted}</h2>
              <h2 className='ok' onClick={handleOK}>
                OK
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const html = document.querySelector('html');
  if (html) html.style.overflow = 'auto';

  return (
    <div id='index-page'>
      {showRedirectMessage && redirectMessageModal()}
      <TitleCard />
      <MainContent />
    </div>
  );
};

export default IndexPage;
