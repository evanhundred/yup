import './index.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getBusiness } from '../../store/businesses';

// i want to allow components to autonomously populate the footer component as needed.

const Footer = () => {
  const location = useLocation();

  const bizPath = location.pathname.split('/');
  const businessId = parseInt(bizPath[bizPath.length - 1]);
  const business = useSelector(getBusiness(businessId));

  const spiderImageAttribution = (
    <span className='spider-image-attribution'>
      Spider image created by
      <a
        href='https://www.flaticon.com/free-icons/draw'
        title='draw icons'
        rel='noopener noreferrer'
        target='_blank'
      >
        {' '}
        Freepik - Flaticon
      </a>
      .
    </span>
  );
  const BizShowErrorCopy = () => {
    return <p className='image-attribution'>Spider image by freepik.</p>;
  };

  const reviewWriteIconAttribution = (
    <>
      <span>
        {' '}
        Draw icons created by
        <a
          href='https://www.flaticon.com/free-icons/draw'
          title='draw icons'
          rel='noopener noreferrer'
          target='_blank'
        >
          {' '}
          Freepik - Flaticon
        </a>
        .
      </span>
    </>
  );

  const stubAttribution = () => {
    if (business && business.stub === 'true') {
      return (
        <span>
          {' '}
          Blueberry pie image by{' '}
          <a
            href='https://www.123rf.com/profile_lineartestpilot'
            title='pie'
            rel='noopener noreferrer'
            target='_blank'
          >
            lineartestpilot
          </a>
          .
        </span>
      );
    }
  };

  const ShareIconCopy = () => {
    return (
      <span className='image-attribution'>
        'Copy' Icon made by
        <a
          href='https://www.flaticon.com/authors/catalin-fertu'
          title='Catalin Fertu'
          rel='noopener noreferrer'
          target='_blank'
        >
          {' '}
          Catalin Fertu
        </a>{' '}
        from
        <a
          href='https://www.flaticon.com/'
          rel='noopener noreferrer'
          target='_blank'
          title='Flaticon'
        >
          {' '}
          www.flaticon.com.
        </a>
      </span>
    );
  };

  const navBarAttribution = (
    <span className='nav-bar-attribution'>
      Down arrow icon created by{' '}
      <a
        href='https://www.flaticon.com/free-icons/down-arrow'
        title='down arrow icons'
        rel='noopener noreferrer'
        target='_blank'
      >
        Roundicons - Flaticon
      </a>
      .
    </span>
  );

  const addBizAsOwnerAttribution = (
    <span className='add-biz-as-owner-attribution'>
      Left arrow icon created by{' '}
      <a
        href='https://www.flaticon.com/authors/ariefstudio'
        title='ariefstudio'
        rel='noopener noreferrer'
        target='_blank'
      >
        ariefstudio - Flaticon
      </a>
      .
    </span>
  );

  const searchResultsAttribution = () => {
    return (
      <span className='search-results-attribution'>
        Broccoli icon made by{' '}
        <a
          href='https://www.flaticon.com/authors/futuer'
          title='Futuer'
          rel='noopener noreferrer'
          target='_blank'
        >
          Futuer
        </a>{' '}
        from{' '}
        <a
          href='https://www.flaticon.com/'
          title='Flaticon'
          rel='noopener noreferrer'
          target='_blank'
        >
          www.flaticon.com
        </a>
        .
      </span>
    );
  };

  return (
    <div className='footer'>
      <p>
        Copyright © 2024 Yup Inc. and
        <a
          href='https://evanryan.dev'
          rel='noopener noreferrer'
          target='_blank'
        >
          {' '}
          Evan Ryan
        </a>
        . Ruby, Rails, PostgreSQL, JavaScript, React, Redux, and related
        languages and frameworks are implemented by Yup.{' '}
        {!['/add-business-as-owner', 'add-business-as-customer'].includes(
          location.pathname
        ) && navBarAttribution}{' '}
        {location.state &&
          location.state.searchErrors &&
          spiderImageAttribution}
        {['/add-business-as-owner', 'add-business-as-customer'].includes(
          location.pathname
        ) && addBizAsOwnerAttribution}
        {location.state === '404' && <BizShowErrorCopy />}
        {location.state !== '404' &&
          location.pathname.match(/businesses\/[0-9]+/) && (
            <>
              <ShareIconCopy />
              {reviewWriteIconAttribution}
              {stubAttribution()}
            </>
          )}
        {location.pathname.match(/search/) && searchResultsAttribution()}
      </p>
    </div>
  );
};

export default Footer;
