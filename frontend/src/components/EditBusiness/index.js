import './index.css';
import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBusiness, fetchBusiness, updateBusiness, deleteBusiness, clearErrors } from '../../store/businesses';
import { loadMessage } from '../../store/messages';
import { backgroundNavBar, unBackgroundNavBar } from '../../util/modal';
import Loading from '../Loading';

const EditBusiness = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();

  // const errors = useSelector((state) => state.businesses.errors);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [formData, setFormData] = useState(business);

  // Selectors
  const business = useSelector(getBusiness(businessId));
  const currentUser = useSelector((state) => state.session.user);

  // State
  const [formData, setFormData] = useState(null);
  const [priceRating, setPriceRating] = useState(null);
  // const [priceRating, setPriceRating] = useState(business ? business.price : null);
  const [errors, setErrors] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
  }, [currentUser, history]);

  // Fetch business on mount
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(fetchBusiness(businessId));
  }, [dispatch, businessId]);

  // Initialize form data when business loads
  useEffect(() => {
    if (business) {
      const initialData = {
        name: business.name || '',
        category: business.category || '',
        website: business.website || '',
        countryCode: business.countryCode || '',
        phone: business.phone || '',
        address: business.address || '',
        city: business.city || '',
        state: business.state || '',
        zipcode: business.zipcode || '',
        country: business.country || '',
        neighborhood: business.neighborhood || '',
        openAt: business.openAt || '',
        about: business.about || '',
        latitude: business.latitude || '',
        longitude: business.longitude || '',
        placeId: business.placeId || ''
      };
      setFormData(initialData);
      setPriceRating(business.price || 0);
    }
  }, [business]);

  // Field configuration
  const fieldConfig = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'price', label: 'Price', type: 'price' },
    { key: 'website', label: 'Website', type: 'text' },
    { key: 'countryCode', label: 'Country Code', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'city', label: 'City', type: 'text' },
    { key: 'state', label: 'State', type: 'text' },
    { key: 'zipcode', label: 'Zipcode', type: 'text' },
    { key: 'country', label: 'Country', type: 'text' },
    { key: 'neighborhood', label: 'Neighborhood', type: 'text' },
    { key: 'openAt', label: 'Open At', type: 'time' },
    { key: 'closedAt', label: 'Closed At', type: 'time' },
    { key: 'about', label: 'About', type: 'text' },
    { key: 'latitude', label: 'Latitude', type: 'text' },
    { key: 'longitude', label: 'Longitude', type: 'text' },
    { key: 'placeId', label: 'Place ID', type: 'text' }
  ];

  // Handlers
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors([]); // Clear errors on input change
  };

  const handlePriceClick = (value) => {
    setPriceRating(value);
    setErrors([]);
  };

  const validateForm = () => {
    const validationErrors = [];

    if (!formData.name || formData.name.trim().length === 0) {
      validationErrors.push('Business name is required');
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setConfirmAction('update');
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    setConfirmAction('delete');
    setShowConfirmModal(true);
  };

  const confirmUpdate = async () => {
    setIsSubmitting(true);
    setErrors([]);

    const businessData = {
      business: {
        ...formData,
        price: priceRating,
        id: businessId
      },
      id: businessId
    };

    const result = await dispatch(updateBusiness(businessData));

    setIsSubmitting(false);
    closeModal();

    if (result.ok) {
      await dispatch(
        loadMessage({
          success: `${formData.name} updated successfully`
        })
      );
      history.push(`/businesses/${businessId}`);
    } else {
      setErrors(result.errors || ['Failed to update business']);
    }
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    setErrors([]);

    const result = await dispatch(deleteBusiness(businessId));

    setIsSubmitting(false);
    closeModal();

    if (result.ok) {
      await dispatch(
        loadMessage({
          deleted: `${formData.name} deleted successfully`
        })
      );
      history.push('/');
    } else {
      setErrors(result.errors || ['Failed to delete business']);
    }
  };

  const handleConfirm = () => {
    if (confirmAction === 'update') {
      confirmUpdate();
    } else if (confirmAction === 'delete') {
      confirmDelete();
    }
  };

  const openModal = () => {
    const html = document.querySelector('html');
    if (html) html.style.overflow = 'hidden';
    backgroundNavBar();
    setShowConfirmModal(true);
  };

  const closeModal = () => {
    const html = document.querySelector('html');
    if (html) html.style.overflow = 'auto';
    unBackgroundNavBar();
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  // Loading state
  if (!business || !formData) {
    return <Loading />;
  }

  // Only allow editing of stub businesses
  if (business.stub !== 'true') {
    return (
      <div id='edit-business-container'>
        <h2>This business cannot be edited.</h2>
        <Link to={`/businesses/${businessId}`}>Back to business</Link>
      </div>
    );
  }

  return (
    <div id='edit-business-container'>
      <h2>
        Edit businesss:{' '}
        <Link to={`/businesses/${businessId}`} className='bizNameLink'>
          {business.name}
        </Link>
      </h2>

      {/* Error Display */}
      {errors.length > 0 && (
        <div className='error-container'>
          {errors.map((error, idx) => (
            <p key={idx} className='error-message'>
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className='input-fields'>
          {fieldConfig.map((field) => (
            <FormField key={field.key} field={field} value={field.type === 'price' ? priceRating : formData[field.key]} onChange={field.type === 'price' ? handlePriceClick : handleInputChange} />
          ))}
        </div>

        <div className='button-container'>
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Update Business'}
          </button>
          <button type='button' className='delete-button' onClick={handleDelete} disabled={isSubmitting}>
            Delete Business
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmModal && <ConfirmModal action={confirmAction} onConfirm={handleConfirm} onCancel={closeModal} isSubmitting={isSubmitting} />}
    </div>
  );
};

// Form Field Component
const FormField = ({ field, value, onChange }) => {
  if (field.type === 'price') {
    return (
      <label className='price-field'>
        <h4>{field.label}</h4>
        <PriceInput value={value} onChange={onChange} />
      </label>
    );
  }

  return (
    <label className={field.key}>
      <h4>
        {field.label}
        {field.required && ' *'}
      </h4>
      <input type={field.type} value={value} onChange={(e) => onChange(field.key, e.target.value)} required={field.required} />
    </label>
  );
};

// Price Input Component
const PriceInput = ({ value, onChange }) => {
  const [hoveredValue, setHoveredValue] = useState(null);

  const displayValue = hoveredValue !== null ? hoveredValue : value;

  return (
    <div className='price-input-container'>
      {[1, 2, 3, 4].map((num) => (
        <div key={num} className={`dollar-box ${num <= displayValue ? 'hovered}' : ''}`} onMouseEnter={() => setHoveredValue(num)} onMouseLeave={() => setHoveredValue(null)} onClick={() => onChange(num)}>
          $
        </div>
      ))}
    </div>
  );
};

// Confirmation Modal Component
const ConfirmModal = ({ action, onConfirm, onCancel, isSubmitting }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel, isSubmitting]);

  const actionText = action === 'delete' ? 'Delete' : 'Update';

  return (
    <div id='confirm-modal-container'>
      <div className='confirm-modal-overlay' onClick={!isSubmitting ? onCancel : undefined} />
      <div className='confirm-modal-box'>
        <div className='confirm-modal-content'>
          <div className='prompt'>
            <div className='confirm-modal-line-1'>
              {!isSubmitting && (
                <div className='close-x' onClick={onCancel}>
                  x
                </div>
              )}
              <h2>Confirm {actionText}</h2>
            </div>
            <p>Are you sure you want to {action} this business?</p>
            <div className='buttons'>
              <button type='button' className='cancel' onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </button>
              <button type='button' className='confirm' onClick={onConfirm} disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : `Confirm ${actionText}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusiness;

//   useEffect(() => {
//     const priceSpans = document.querySelectorAll('#edit-business-container .price-input-container div.dollar-box');
//     const priceNumber = business ? business.price : null;
//     const stylePriceSpans = (num) => {
//       const oldNum = parseInt(priceNumber);
//       priceSpans.forEach((span, idx) => {
//         if (idx < oldNum) span.classList.remove(`hovered`);
//         if (idx < parseInt(num)) span.classList.add(`hovered`);
//       });
//     };

//     if (business) stylePriceSpans(priceNumber);
//   }, [business]);

//   if (!currentUser) history.push('/login');

//   // const [formErrors, setFormErrors] = useState({});

//   const [initialPriceRatingClicked, setInitialPriceRatingClicked] = useState(false);

//   const keysArray = business ? Object.keys(business) : null;
//   const exclude = ['id', 'imageUrls', 'authorNames', 'reviews', 'owns', 'stub', 'photosMetadata'];
//   const excludeObject = {};
//   exclude.forEach((key) => {
//     excludeObject[key] = key;
//   });

//   const [componentToRender, setComponentToRender] = useState('initial');

//   // const [errors, setErrors] = useState([]);

//   const keyPositions = ['name', 'category', 'price', 'website', 'countryCode', 'phone', 'address', 'city', 'state', 'zipcode', 'country', 'neighborhood', 'openAt', 'closedAt', 'about', 'latitude', 'longitude', 'placeId'];
//   const keyPositionsObject = {};
//   const fieldOrderObject = {};
//   keyPositions.forEach((key, idx) => {
//     keyPositionsObject[idx + 1] = { fieldName: key, component: null };
//     fieldOrderObject[key] = idx + 1;
//   });

//   const populateTemplateObject = () => {
//     const templateObject = {};
//     keyPositions.forEach((key) => {
//       templateObject[key] = business[key];
//     });
//     return templateObject;
//   };

//   const [bizTemplate, setBizTemplate] = useState(business ? { ...populateTemplateObject() } : null);

//   const [updateType, setUpdateType] = useState(null);

//   if (!business) return <Loading />;

//   const businessInfoForm = () => {
//     if (!bizTemplate) setBizTemplate({ ...populateTemplateObject() });
//     const handleChange = (event, key) => {
//       setBizTemplate({
//         ...bizTemplate,
//         [key]: event.target.value
//       });
//     };

//     const filteredKeysArray = [];
//     keysArray.forEach((key) => {
//       if (!excludeObject[key]) filteredKeysArray.push(key);
//     });

//     const fieldsObject = {};
//     const textFields = ['name', 'address', 'city', 'state', 'neighborhood', 'about', 'country'];
//     textFields.forEach((field) => {
//       fieldsObject[field] = 'text';
//     });
//     const timeFields = ['openAt', 'closedAt'];
//     timeFields.forEach((field) => {
//       fieldsObject[field] = 'time';
//     });

//     const priceSpans = document.querySelectorAll('#edit-business-container .price-input-container div.dollar-box');

//     const stylePriceSpans = (num) => {
//       const oldNum = parseInt(priceRating);
//       priceSpans.forEach((span, idx) => {
//         if (idx < oldNum) span.classList.remove(`hovered`);
//         if (idx < parseInt(num)) span.classList.add(`hovered`);
//       });
//     };

//     const handlePriceHover = (e, isHovered, num) => {
//       if (isHovered) {
//         setPriceRating(num);
//       } else {
//         setPriceRating(0);
//       }
//       priceSpans.forEach((span, idx) => {
//         if (idx < num) {
//           if (isHovered) span.classList.add(`hovered`);
//           else span.classList.remove(`hovered`);
//         }
//       });
//     };

//     const handlePriceClick = (num, e = null) => {
//       if (e) e.preventDefault();
//       if (!initialPriceRatingClicked) setInitialPriceRatingClicked(true);
//       stylePriceSpans(num);
//       setPriceRating(num);
//     };

//     filteredKeysArray.forEach((key) => {
//       if (exclude.includes(key)) return <h3 key={key}>hi</h3>;
//       let proxyKey;
//       if (bizTemplate) {
//         if (!bizTemplate[[key]]) {
//           proxyKey = '';
//         } else {
//           proxyKey = bizTemplate[[key]];
//         }
//       }

//       let labelComponent;

//       if (key === 'price') {
//         const getDollarArray = () => {
//           const dollars = [];
//           let count = 1;
//           while (count <= 4) {
//             const spanNumber = count;
//             const dollarComponent = (
//               <div
//                 key={spanNumber}
//                 className={`dollar-box dollar-${spanNumber}`}
//                 onMouseEnter={(e) => !initialPriceRatingClicked && handlePriceHover(e, true, spanNumber)}
//                 onMouseLeave={(e) => {
//                   if (!initialPriceRatingClicked) handlePriceHover(e, false, spanNumber);
//                 }}
//                 onClick={(e) => handlePriceClick(spanNumber, e)}
//               >
//                 $
//               </div>
//             );
//             dollars.push(dollarComponent);
//             count += 1;
//           }
//           return dollars;
//         };
//         labelComponent = (
//           <label className='price' key='price'>
//             <h4>{key}</h4>
//             <div className='price-input-container'>{getDollarArray()}</div>
//           </label>
//         );
//       } else {
//         const toSkewerCase = (string) => {
//           const stringArray = string.split('');
//           const skeweredArray = [];
//           for (let i = 0; i < string.length; i++) {
//             if (i === 0) {
//               skeweredArray.push(stringArray[i].toLowerCase());
//             } else if (stringArray[i] === stringArray[i].toUpperCase()) {
//               skeweredArray.push('-');
//               skeweredArray.push(stringArray[i].toLowerCase());
//             } else {
//               skeweredArray.push(stringArray[i]);
//             }
//           }
//           return skeweredArray.join('');
//         };
//         labelComponent = (
//           <label className={`${toSkewerCase(key)}`} key={key}>
//             <h4>{key}</h4>
//             <input value={proxyKey} type={fieldsObject[key]} onChange={(e) => handleChange(e, key)} />
//             {/* {formErrors[key] && errorBox(key)} */}
//           </label>
//         );
//       }

//       keyPositionsObject[fieldOrderObject[key]] = {
//         ...keyPositionsObject[fieldOrderObject[key]],
//         component: labelComponent
//       };
//     });

//     const orderedLabelComponents = () => {
//       const numberOfKeys = Object.keys(keyPositionsObject).length;
//       const componentsArray = [];
//       let count = 1;
//       while (count <= numberOfKeys) {
//         componentsArray.push(keyPositionsObject[count].component);
//         count++;
//       }
//       return componentsArray;
//     };

//     const handleBackendErrors = (backendErrors) => {
//       const fieldErrors = {};

//       if (Array.isArray(backendErrors)) {
//         backendErrors.forEach((error) => {
//           if (error.toLowerCase().includes('name')) fieldErrors.name = error;
//           else if (error.toLowerCase().includes('email')) fieldErrors.email = error;
//           else if (error.toLowerCase.includes('phone')) fieldErrors.phone = error;
//           else {
//             if (!fieldErrors.general) fieldErrors.general = [];
//             fieldErrors.general.push(error);
//           }
//         });
//       } else if (typeof backendErrors === 'object') {
//         Object.keys(backendErrors).forEach((field) => {
//           if (backendErrors[field].length > 0) {
//             fieldErrors[field] = backendErrors[field][0];
//           }
//         });
//       } else {
//         fieldErrors.general = ['Something went wrong. Please try again.'];
//       }

//       setErrors(fieldErrors);
//       setComponentToRender('submit-fail');
//     };

//     const onSuccess = (business) => {
//       console.log('success:', business);
//       setComponentToRender('submit-success');
//     };

//     const submitUpdate = async () => {
//       // console.log(business);
//       setShowConfirmModal(false);
//       const businessObject = {
//         business: { ...bizTemplate, id: business.id, price: priceRating },
//         id: business.id
//       };

//       // const res = await dispatch(updateBusiness(businessObject)).catch(async (res) => {
//       //   let data;
//       //   try {
//       //     console.log('try');
//       //     data = await res.clone().json();
//       //   } catch {
//       //     console.log('catch');
//       //     data = await res.text();
//       //   }
//       //   if (data?.errors) {
//       //     console.log('data?.errors');
//       //     setErrors(data.errors);
//       //     setComponentToRender('submit-fail');
//       //   } else if (data) {
//       //     console.log('data');
//       //     setErrors([data]);
//       //     setComponentToRender('submit-fail');
//       //   } else {
//       //     console.log('else');
//       //     setErrors([res.statusText]);
//       //     setComponentToRender('submit-fail');
//       //   }
//       // });

//       const result = await dispatch(updateBusiness(businessObject));
//       if (result.success) {
//         onSuccess(result.business);
//       } else {
//         console.log('Update failed:', result.errors);
//       }

//       setIsSubmitting(false);
//       // if (!response.ok) {
//       //   console.log('Backend errors received:', response.errors);
//       //   handleBackendErrors(response.errors);
//       // }

//       // onSuccess(response.business);

//       // let next;
//       // if (response && response.id) next = 'submit-success';
//       // else next = 'submit-fail';

//       // setComponentToRender(next);
//     };

//     const confirmUpdate = () => {
//       switch (updateType) {
//         case 'update':
//           submitUpdate();
//           break;
//         case 'delete':
//           dispatchDeleteBusiness();
//           break;
//         default:
//           return;
//       }
//     };

//     const ConfirmModal = () => {
//       return (
//         <div id='confirm-modal-container' onLoad={listenForEsc}>
//           <div className='confirm-modal-overlay' onClick={(e) => handleCloseModal(e)} />
//           <div className='confirm-modal-box'>
//             <div className='confirm-modal-content'>
//               <div className='prompt'>
//                 <div className='confirm-modal-line-1'>
//                   <div className='close-x' onClick={(e) => handleCloseModal(e)}>
//                     X
//                   </div>
//                   <h2>{`Please confirm ${capitalize(updateType)}.`}</h2>
//                 </div>
//                 <div className='buttons'>
//                   <h3 className='cancel' onClick={(e) => handleCloseModal(e)}>
//                     Cancel
//                   </h3>
//                   <h3 className='confirm' onClick={confirmUpdate}>
//                     Confirm
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     };

//     const dispatchDeleteBusiness = async () => {
//       const res = await dispatch(deleteBusiness(businessId)).catch(async (res) => {
//         let data;
//         try {
//           data = await res.clone().json();
//         } catch {
//           data = await res.text();
//         }
//         if (data?.errors) setErrors(data.errors);
//         else if (data) setErrors([data]);
//         else setErrors([res.statusText]);
//       });

//       let next;
//       let data;
//       if (res.message === 'success') {
//         const message = {
//           deleted: `${bizTemplate.name} deleted successfully.`
//         };

//         const res = await dispatch(loadMessage(message));
//         if (res && res.ok) {
//           data = res.json();
//         } else {
//           data = res;
//         }

//         history.push('/');
//       } else next = 'submit-fail';

//       setComponentToRender(next);
//     };

//     const html = document.querySelector('html');
//     if (!showConfirmModal) html.style.overflow = 'auto';

//     const handleSubmit = (e, actionType) => {
//       e.preventDefault();

//       const frontendErrors = validateBusinessForm(formData);
//       if (Object.keys(frontendErrors).length > 0) {
//         setLocalErrors(frontendErrors);
//         return;
//       }

//       setIsSubmitting(true);
//       dispatch(clearBusinessErrors()); // Clear previous errors

//       setComponentToRender('initial');

//       if (html) html.style.overflow = 'hidden';
//       backgroundNavBar();

//       switch (actionType) {
//         case 'update':
//           setUpdateType('update');
//           // if (business.name && business.name.length > 0) {
//           if (bizTemplate.name && bizTemplate.name.length > 0) {
//             setShowConfirmModal(true);
//             // submitUpdate();
//           } else {
//             console.log(errors);
//             setErrors(errors.concat(['Name needed.']));
//             setComponentToRender('submit-fail');
//           }
//           break;
//         case 'delete':
//           setUpdateType('delete');
//           setShowConfirmModal(true);
//           break;
//         default:
//           return;
//       }
//     };

//     const handleCloseModal = (e) => {
//       e.preventDefault();

//       if (html) html.style.overflow = 'auto';
//       unBackgroundNavBar();

//       setShowConfirmModal(false);
//     };

//     const closeOnPressEsc = (e) => {
//       if (e.key === 'Escape') {
//         handleCloseModal(e);
//         html.removeEventListener('keydown', closeOnPressEsc);
//       }
//     };

//     const listenForEsc = () => {
//       html.addEventListener('keydown', closeOnPressEsc, { once: true });
//     };

//     // const errorBox = (field) => {
//     //   return (
//     //     <div className='error-box'>
//     //       <p>{formErrors[field]}</p>
//     //     </div>
//     //   );
//     // };

//     return (
//       <div className='business-info-form-container'>
//         <form onSubmit={(e) => handleSubmit(e, 'update')}>
//           {displayErrors()}
//           <div className='input-fields'>{keyPositionsObject && keyPositionsObject && orderedLabelComponents()}</div>
//           <div className='button-container'>
//             <label>
//               <button>Submit</button>
//             </label>
//             <div className='delete' onClick={(e) => handleSubmit(e, 'delete')}>
//               <h3>Delete</h3>
//             </div>
//           </div>
//         </form>
//         {showConfirmModal && <ConfirmModal />}
//       </div>
//     );
//   };

//   const handleBizNameClick = () => history.push(`/businesses/${business.id}`);

//   const submitSuccessComponent = (submitType) => {
//     return (
//       <div className='submit-success'>
//         <h2>Success.</h2>
//         {submitType === 'update' && (
//           <h2>
//             Visit{' '}
//             <span className='bizNameLink' onClick={handleBizNameClick}>
//               {business.name}
//             </span>
//             .
//           </h2>
//         )}
//         {submitType === 'delete-success' && (
//           <div className='biz-deleted-prompt'>
//             <h2>Business deleted.</h2>
//             <Link to='/'>
//               <h2>Yup home.</h2>
//             </Link>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const submitFailComponent = () => {
//     // setShowConfirmModal(false);
//     window.scrollTo({ top: 0, behavior: 'auto' });

//     return (
//       <div className='submit-fail'>
//         <h2>Failed to submit.</h2>
//         <h2>Please fix the following errors:</h2>
//         {errors.map((error, index) => (
//           <h2 className={`error-${index}`} key={`error${index}`}>
//             error: {error}
//           </h2>
//         ))}
//         {/* {businessInfoForm()} */}
//       </div>
//     );
//   };

//   if (business.stub === 'true') {
//     return (
//       <div id='edit-business-container'>
//         {componentToRender === 'submit-fail' && submitFailComponent()}
//         {componentToRender === 'initial' && (
//           <>
//             <h2>
//               Edit business stub for{' '}
//               <span className='bizNameLink' onClick={handleBizNameClick}>
//                 {business.name}
//               </span>
//               .
//             </h2>
//             {businessInfoForm()}
//           </>
//         )}
//         {componentToRender === 'submit-success' && submitSuccessComponent('update')}
//         {componentToRender === 'delete-success' && submitSuccessComponent('delete')}
//       </div>
//     );
//   }
//   if (business.stub === 'false') {
//     return <div id='edit-business-container'>Edit business.</div>;
//   }

//   return <div className='error'>error: no stub information.</div>;
// };

// export default EditBusiness;
