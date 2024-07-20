import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';
import LoginImage from '../LoginFormPage/LoginImage';
import { backgroundHeaderBar, unBackgroundHeaderBar } from '../../util/modal';
import './modal.css';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  if (sessionUser) return <Redirect to='/' />;

  const html = document.querySelector('html');
  if (!showModal) html.style.overflow = 'auto';

  const handleCloseModal = (e) => {
    e.preventDefault();
    if (html) html.style.overflow = 'auto';
    unBackgroundHeaderBar();
    setShowModal(false);
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

  const constraints = {
    name: {
      isTooShort: {
        expression: /.{3,30}/,
        errorMsg: 'name must contain from 3 to 30 characters.'
      },
      isEmail: {
        expression: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        errorMsg: 'name must not be in email address format.'
      }
    },
    email: {
      expression: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      errorMsg: 'email must be in valid format.'
    },
    password: 'password must match confirm password.'
  };

  const validationErrorsExist = Object.keys(validationErrors).length >= 1;

  const validateInputs = (e) => {
    // console.log(e);
    let inputsValid = true;
    for (const field in constraints) {
      const constraintObj = constraints[field];
      // console.log(constraintObj);
      if (field === 'name') {
        const nameValidationErrors = [];
        for (const validationParameter in constraintObj) {
          // console.log(validationParameter);
          // console.log(constraintObj[validationParameter]);
          // console.log(name);
          if ((validationParameter === 'isTooShort' && !name.match(constraintObj[validationParameter].expression)) || (validationParameter === 'isEmail' && name.match(constraintObj[validationParameter].expression))) {
            inputsValid = false;
            nameValidationErrors.push(constraintObj[validationParameter].errorMsg);
          }
        }
        const newError = { [field]: nameValidationErrors };
        setValidationErrors((validationErrors) => ({
          ...validationErrors,
          ...newError
        }));
      }
      if (field === 'email') {
        if (!email.match(constraintObj.expression)) {
          inputsValid = false;
          const newError = { [field]: constraintObj.errorMsg };
          setValidationErrors((validationErrors) => ({
            ...validationErrors,
            ...newError
          }));
        }
      }
      if (field === 'password') {
        if (password !== confirmPassword) {
          inputsValid = false;
          const newError = { [field]: constraintObj };
          setValidationErrors((validationErrors) => ({
            ...validationErrors,
            ...newError
          }));
        }
      }
    }
    // if (
    //   !validationErrors.email &&
    //   !validationErrors.password &&
    //   validationErrors.name &&
    //   validationErrors.name.length === 0
    // ) {
    //   setValidationErrors({});

    //   console.log(inputsValid);
    //   return inputsValid;
    // }
    // console.log()
    // const inputsValid = Object.keys(validationErrors).length === 0;
    // console.log(validationErrors);
    // console.log(inputsValid);
    if (!inputsValid) setSubmitClicked(false);
    return inputsValid;
  };

  // console.log(validationErrors);
  // console.log(constraints

  const renderValidationErrors = () => {
    // const nameErrors = [];
    let nameErrorsComponent;
    if (validationErrors.name) {
      nameErrorsComponent = (
        <div className='name-errors'>
          {validationErrors.name.map((errorMsg, idx) => (
            <h3 key={errorMsg.slice(0, 6).concat(idx)}>{errorMsg}</h3>
          ))}
        </div>
      );
    }
    let emailErrorsComponent;
    if (validationErrors.email) {
      emailErrorsComponent = (
        <div className='email-errors'>
          <h3>{validationErrors.email}</h3>
        </div>
      );
    }
    let passwordErrorsComponent;
    if (validationErrors.password) {
      passwordErrorsComponent = (
        <div className='password-errors'>
          <h3>{validationErrors.password}</h3>
        </div>
      );
    }
    const component = (
      <div className='validation-errors-container'>
        {nameErrorsComponent && nameErrorsComponent}
        {emailErrorsComponent && emailErrorsComponent}
        {passwordErrorsComponent && passwordErrorsComponent}
      </div>
    );
    return component;
  };

  const toggleButtonAccess = (type) => {
    const button = document.querySelector('.signup-page-container button#sign-up-button');
    if (type === 'ghost') {
      setSubmitClicked(true);
      button.classList.add('ghosted');
    }
    if (type === 'unghost') {
      setSubmitClicked(false);
      button.classList.remove('ghosted');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    if (submitClicked) return null;
    setHideErrorBox(false);
    setValidationErrors({});

    toggleButtonAccess('ghost');

    if (validateInputs(e)) {
      // console.log("dispatch route reached.");

      const sendDataToBackend = async () => {
        setErrors([]);
        dispatch(sessionActions.signup({ name, email, password })).catch(async (resError) => {
          let data;
          try {
            data = await resError.clone().json();
            // console.log(data);
          } catch {
            data = await resError.text();
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([resError.statusText]);
          console.log(data);
          toggleButtonAccess('unghost');
        });
      };

      sendDataToBackend();
    }
    // console.log(errors);
  };

  const closeBox = () => setHideErrorBox(true);

  const ErrorBox = () => {
    if (errors.length > 0 && !hideErrorBox) {
      return (
        <div id='signup-errors'>
          <ul>
            {errors.map((error) => (
              <li className='error-line' key={error}>
                {error}
              </li>
            ))}
          </ul>

          <button id='closeBoxButton' onClick={closeBox}>
            x
          </button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const renderTOSCopy = () => {
    const tosCopy = 'Be excellent to each other.';
    const ppCopy = 'Your personal data is private.';
    if (modalType === 'tos') return tosCopy;
    if (modalType === 'privacy') return ppCopy;
  };

  const handleTOSClick = (type) => {
    backgroundHeaderBar();
    setModalType(type);
    setShowModal(true);

    // if (type === "tos") console.log(tosCopy);
    // if (type === "privacy") console.log(ppCopy);
  };

  const Modal = () => {
    return (
      <div id='modal-container' onLoad={listenForEsc}>
        <div className='modal-overlay' onClick={(e) => handleCloseModal(e)} />
        <div className='modal-box'>
          <div className='modal-content'>
            <div className='modal-line-1'>
              <div className='close-x' onClick={(e) => handleCloseModal(e, 'confirm')}>
                <p>X</p>
              </div>
            </div>
            <div className='modal-line-2'>
              <div className='prompt'>
                <h2>{renderTOSCopy()}</h2>
              </div>
            </div>
            <div className='buttons'>
              <h3 onClick={(e) => handleCloseModal(e)}>OK</h3>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // console.log(validationErrorsExist);
  // console.log(validationErrors);
  return (
    <div className='signup-page-container'>
      <div className='error-box-container'>
        <ErrorBox />
      </div>
      <div className='signup-left'>
        <div className='top-text'>
          <h2>Sign Up for Yup</h2>
          <h3>Connect with great local businesses</h3>
          <p>
            By continuing, you agree to Yup's{' '}
            <span className='link' onClick={() => handleTOSClick('tos')}>
              Terms of Service
            </span>{' '}
            and acknowledge Yup's{' '}
            <span className='link' onClick={() => handleTOSClick('privacy')}>
              Privacy Policy
            </span>
            .
          </p>
        </div>
        <form onSubmit={handleSubmit} className='signup-form'>
          <label>
            <input className={errors.length > 0 ? 'error-input-field' : 'input-field'} value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            <input className={errors.length > 0 ? 'error-input-field' : 'input-field'} value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            <input className={errors.length > 0 ? 'error-input-field' : 'input-field'} type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label>
            <input className={errors.length > 0 ? 'error-input-field' : 'input-field'} type='password' value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>
          <button id='sign-up-button'>Sign Up</button>
        </form>
        <div className='login-footer'>
          Already on Yup? <a href='/login'>Log in</a>
        </div>
        {validationErrorsExist && renderValidationErrors()}
      </div>
      <div className='signup-right'>
        <LoginImage />
      </div>
      {showModal && <Modal />}
    </div>
  );
};

export default SignupFormPage;
