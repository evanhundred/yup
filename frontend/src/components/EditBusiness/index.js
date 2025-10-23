import './index.css';

import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBusiness, fetchBusiness, updateBusiness, deleteBusiness, clearErrors } from '../../store/businesses';
import { loadMessage } from '../../store/messages';
import { backgroundNavBar, unBackgroundNavBar, capitalize } from '../../util/modal';
import Loading from '../Loading';

const EditBusiness = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { businessId } = useParams();

  const business = useSelector(getBusiness(businessId));
  const [priceRating, setPriceRating] = useState(business ? business.price : null);

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(fetchBusiness(businessId));
  }, [dispatch, businessId]);

  useEffect(() => {
    const priceSpans = document.querySelectorAll('#edit-business-container .price-input-container div.dollar-box');
    const priceNumber = business ? business.price : null;
    const stylePriceSpans = (num) => {
      const oldNum = parseInt(priceNumber);
      priceSpans.forEach((span, idx) => {
        if (idx < oldNum) span.classList.remove(`hovered`);
        if (idx < parseInt(num)) span.classList.add(`hovered`);
      });
    };

    if (business) stylePriceSpans(priceNumber);
  }, [business]);

  const currentUser = useSelector((state) => state.session.user);
  if (!currentUser) history.push('/login');

  // const [formErrors, setFormErrors] = useState({});

  const [initialPriceRatingClicked, setInitialPriceRatingClicked] = useState(false);

  const keysArray = business ? Object.keys(business) : null;
  const exclude = ['id', 'imageUrls', 'authorNames', 'reviews', 'owns', 'stub', 'photosMetadata'];
  const excludeObject = {};
  exclude.forEach((key) => {
    excludeObject[key] = key;
  });

  const [componentToRender, setComponentToRender] = useState('initial');

  const [errors, setErrors] = useState([]);

  const keyPositions = ['name', 'category', 'price', 'website', 'countryCode', 'phone', 'address', 'city', 'state', 'zipcode', 'country', 'neighborhood', 'openAt', 'closedAt', 'about', 'latitude', 'longitude', 'placeId'];
  const keyPositionsObject = {};
  const fieldOrderObject = {};
  keyPositions.forEach((key, idx) => {
    keyPositionsObject[idx + 1] = { fieldName: key, component: null };
    fieldOrderObject[key] = idx + 1;
  });

  const populateTemplateObject = () => {
    const templateObject = {};
    keyPositions.forEach((key) => {
      templateObject[key] = business[key];
    });
    return templateObject;
  };

  const [bizTemplate, setBizTemplate] = useState(business ? { ...populateTemplateObject() } : null);

  const [updateType, setUpdateType] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!business) return <Loading />;

  const businessInfoForm = () => {
    if (!bizTemplate) setBizTemplate({ ...populateTemplateObject() });
    const handleChange = (event, key) => {
      setBizTemplate({
        ...bizTemplate,
        [key]: event.target.value
      });
    };

    const filteredKeysArray = [];
    keysArray.forEach((key) => {
      if (!excludeObject[key]) filteredKeysArray.push(key);
    });

    const fieldsObject = {};
    const textFields = ['name', 'address', 'city', 'state', 'neighborhood', 'about', 'country'];
    textFields.forEach((field) => {
      fieldsObject[field] = 'text';
    });
    const timeFields = ['openAt', 'closedAt'];
    timeFields.forEach((field) => {
      fieldsObject[field] = 'time';
    });

    const priceSpans = document.querySelectorAll('#edit-business-container .price-input-container div.dollar-box');

    const stylePriceSpans = (num) => {
      const oldNum = parseInt(priceRating);
      priceSpans.forEach((span, idx) => {
        if (idx < oldNum) span.classList.remove(`hovered`);
        if (idx < parseInt(num)) span.classList.add(`hovered`);
      });
    };

    const handlePriceHover = (e, isHovered, num) => {
      if (isHovered) {
        setPriceRating(num);
      } else {
        setPriceRating(0);
      }
      priceSpans.forEach((span, idx) => {
        if (idx < num) {
          if (isHovered) span.classList.add(`hovered`);
          else span.classList.remove(`hovered`);
        }
      });
    };

    const handlePriceClick = (num, e = null) => {
      if (e) e.preventDefault();
      if (!initialPriceRatingClicked) setInitialPriceRatingClicked(true);
      stylePriceSpans(num);
      setPriceRating(num);
    };

    filteredKeysArray.forEach((key) => {
      if (exclude.includes(key)) return <h3 key={key}>hi</h3>;
      let proxyKey;
      if (bizTemplate) {
        if (!bizTemplate[[key]]) {
          proxyKey = '';
        } else {
          proxyKey = bizTemplate[[key]];
        }
      }

      let labelComponent;

      if (key === 'price') {
        const getDollarArray = () => {
          const dollars = [];
          let count = 1;
          while (count <= 4) {
            const spanNumber = count;
            const dollarComponent = (
              <div
                key={spanNumber}
                className={`dollar-box dollar-${spanNumber}`}
                onMouseEnter={(e) => !initialPriceRatingClicked && handlePriceHover(e, true, spanNumber)}
                onMouseLeave={(e) => {
                  if (!initialPriceRatingClicked) handlePriceHover(e, false, spanNumber);
                }}
                onClick={(e) => handlePriceClick(spanNumber, e)}
              >
                $
              </div>
            );
            dollars.push(dollarComponent);
            count += 1;
          }
          return dollars;
        };
        labelComponent = (
          <label className='price' key='price'>
            <h4>{key}</h4>
            <div className='price-input-container'>{getDollarArray()}</div>
          </label>
        );
      } else {
        const toSkewerCase = (string) => {
          const stringArray = string.split('');
          const skeweredArray = [];
          for (let i = 0; i < string.length; i++) {
            if (i === 0) {
              skeweredArray.push(stringArray[i].toLowerCase());
            } else if (stringArray[i] === stringArray[i].toUpperCase()) {
              skeweredArray.push('-');
              skeweredArray.push(stringArray[i].toLowerCase());
            } else {
              skeweredArray.push(stringArray[i]);
            }
          }
          return skeweredArray.join('');
        };
        labelComponent = (
          <label className={`${toSkewerCase(key)}`} key={key}>
            <h4>{key}</h4>
            <input value={proxyKey} type={fieldsObject[key]} onChange={(e) => handleChange(e, key)} />
            {/* {formErrors[key] && errorBox(key)} */}
          </label>
        );
      }

      keyPositionsObject[fieldOrderObject[key]] = {
        ...keyPositionsObject[fieldOrderObject[key]],
        component: labelComponent
      };
    });

    const orderedLabelComponents = () => {
      const numberOfKeys = Object.keys(keyPositionsObject).length;
      const componentsArray = [];
      let count = 1;
      while (count <= numberOfKeys) {
        componentsArray.push(keyPositionsObject[count].component);
        count++;
      }
      return componentsArray;
    };

    const submitUpdate = async () => {
      // console.log(business);
      setShowConfirmModal(false);
      const businessObject = {
        business: { ...bizTemplate, id: business.id, price: priceRating },
        id: business.id
      };

      const res = await dispatch(updateBusiness(businessObject)).catch(async (res) => {
        let data;
        try {
          console.log('try');
          data = await res.clone().json();
        } catch {
          console.log('catch');
          data = await res.text();
        }
        if (data?.errors) {
          console.log('data?.errors');
          setErrors(data.errors);
          setComponentToRender('submit-fail');
        } else if (data) {
          console.log('data');
          setErrors([data]);
          setComponentToRender('submit-fail');
        } else {
          console.log('else');
          setErrors([res.statusText]);
          setComponentToRender('submit-fail');
        }
      });

      let next;
      if (res && res.id) next = 'submit-success';
      else next = 'submit-fail';

      setComponentToRender(next);
    };

    const confirmUpdate = () => {
      switch (updateType) {
        case 'update':
          submitUpdate();
          break;
        case 'delete':
          dispatchDeleteBusiness();
          break;
        default:
          return;
      }
    };

    const ConfirmModal = () => {
      return (
        <div id='confirm-modal-container' onLoad={listenForEsc}>
          <div className='confirm-modal-overlay' onClick={(e) => handleCloseModal(e)} />
          <div className='confirm-modal-box'>
            <div className='confirm-modal-content'>
              <div className='prompt'>
                <div className='confirm-modal-line-1'>
                  <div className='close-x' onClick={(e) => handleCloseModal(e)}>
                    X
                  </div>
                  <h2>{`Please confirm ${capitalize(updateType)}.`}</h2>
                </div>
                <div className='buttons'>
                  <h3 className='cancel' onClick={(e) => handleCloseModal(e)}>
                    Cancel
                  </h3>
                  <h3 className='confirm' onClick={confirmUpdate}>
                    Confirm
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const dispatchDeleteBusiness = async () => {
      const res = await dispatch(deleteBusiness(businessId)).catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });

      let next;
      let data;
      if (res.message === 'success') {
        const message = {
          deleted: `${bizTemplate.name} deleted successfully.`
        };

        const res = await dispatch(loadMessage(message));
        if (res && res.ok) {
          data = res.json();
        } else {
          data = res;
        }

        history.push('/');
      } else next = 'submit-fail';

      setComponentToRender(next);
    };

    const html = document.querySelector('html');
    if (!showConfirmModal) html.style.overflow = 'auto';

    const handleSubmit = (e, actionType) => {
      e.preventDefault();

      if (html) html.style.overflow = 'hidden';
      backgroundNavBar();

      switch (actionType) {
        case 'update':
          setUpdateType('update');
          // if (business.name && business.name.length > 0) {
          if (bizTemplate.name && bizTemplate.name.length > 0) {
            setShowConfirmModal(true);
            // submitUpdate();
          } else {
            console.log(errors);
            setErrors(errors.concat(['Name needed.']));
            setComponentToRender('submit-fail');
          }
          break;
        case 'delete':
          setUpdateType('delete');
          setShowConfirmModal(true);
          break;
        default:
          return;
      }
    };

    const handleCloseModal = (e) => {
      e.preventDefault();

      if (html) html.style.overflow = 'auto';
      unBackgroundNavBar();

      setShowConfirmModal(false);
    };

    const closeOnPressEsc = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal(e);
        html.removeEventListener('keydown', closeOnPressEsc);
      }
    };

    const listenForEsc = () => {
      html.addEventListener('keydown', closeOnPressEsc, { once: true });
    };

    // const errorBox = (field) => {
    //   return (
    //     <div className='error-box'>
    //       <p>{formErrors[field]}</p>
    //     </div>
    //   );
    // };

    return (
      <div className='business-info-form-container'>
        <form onSubmit={(e) => handleSubmit(e, 'update')}>
          <div className='input-fields'>{keyPositionsObject && keyPositionsObject && orderedLabelComponents()}</div>
          <div className='button-container'>
            <label>
              <button>Submit</button>
            </label>
            <div className='delete' onClick={(e) => handleSubmit(e, 'delete')}>
              <h3>Delete</h3>
            </div>
          </div>
        </form>
        {showConfirmModal && <ConfirmModal />}
      </div>
    );
  };

  const handleBizNameClick = () => history.push(`/businesses/${business.id}`);

  const submitSuccessComponent = (submitType) => {
    return (
      <div className='submit-success'>
        <h2>Success.</h2>
        {submitType === 'update' && (
          <h2>
            Visit{' '}
            <span className='bizNameLink' onClick={handleBizNameClick}>
              {business.name}
            </span>
            .
          </h2>
        )}
        {submitType === 'delete-success' && (
          <div className='biz-deleted-prompt'>
            <h2>Business deleted.</h2>
            <Link to='/'>
              <h2>Yup home.</h2>
            </Link>
          </div>
        )}
      </div>
    );
  };

  const submitFailComponent = () => {
    // setShowConfirmModal(false);
    window.scrollTo({ top: 0, behavior: 'auto' });

    return (
      <div className='submit-fail'>
        <h2>Failed to submit.</h2>
        <h2>Please fix the following errors:</h2>
        {errors.map((error, index) => (
          <h2 className={`error-${index}`} key={`error${index}`}>
            error: {error}
          </h2>
        ))}
        {businessInfoForm()}
      </div>
    );
  };

  if (business.stub === 'true') {
    return (
      <div id='edit-business-container'>
        {componentToRender === 'submit-fail' && submitFailComponent()}
        {componentToRender === 'initial' && (
          <>
            <h2>
              Edit business stub for{' '}
              <span className='bizNameLink' onClick={handleBizNameClick}>
                {business.name}
              </span>
              .
            </h2>
            {businessInfoForm()}
          </>
        )}
        {componentToRender === 'submit-success' && submitSuccessComponent('update')}
        {componentToRender === 'delete-success' && submitSuccessComponent('delete')}
      </div>
    );
  }
  if (business.stub === 'false') {
    return <div id='edit-business-container'>Edit business.</div>;
  }

  return <div className='error'>error: no stub information.</div>;
};

export default EditBusiness;
