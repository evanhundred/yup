import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import LoginImage from "../LoginFormPage/LoginImage";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const constraints = {
    name: {
      isTooShort: {
        expression: /\.{3,30}/,
        errorMsg: "name must contain from 3 to 30 characters."
      },
      isEmail: {
        expression: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        errorMsg: "name must not be in email address format."
      }
    },
    email: {
      expression: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      errorMsg: "email must be in valid format."
    },
    password: "password must match confirm password."
  };

  const validationErrorsExist = Object.keys(validationErrors).length >= 1;

  const validateInputs = () => {
    for (const field in constraints) {
      const constraintObj = constraints[field];
      console.log(constraintObj);
      if (field === "name") {
        const nameValidationErrors = [];
        for (const validationParameter in constraintObj) {
          console.log(validationParameter);
          console.log(constraintObj[validationParameter]);
          if (
            (validationParameter === "isTooShort" &&
              !name.match(constraintObj[validationParameter].expression)) ||
            (validationParameter === "isEmail" &&
              name.match(constraintObj[validationParameter].expression))
          ) {
            nameValidationErrors.push(
              constraintObj[validationParameter].errorMsg
            );
          }
        }
        const newError = { [field]: nameValidationErrors };
        setValidationErrors((validationErrors) => ({
          ...validationErrors,
          ...newError
        }));
      }
      if (field === "email") {
        if (!email.match(constraintObj.expression)) {
          const newError = { [field]: constraintObj.errorMsg };
          setValidationErrors((validationErrors) => ({
            ...validationErrors,
            ...newError
          }));
        }
      }
      if (field === "password") {
        if (password !== confirmPassword) {
          const newError = { [field]: constraintObj };
          setValidationErrors((validationErrors) => ({
            ...validationErrors,
            ...newError
          }));
        }
      }
    }
    const inputsValid = Object.keys(validationErrors).length > 0;
    console.log(inputsValid);
    return inputsValid;
  };

  console.log(validationErrors);
  // console.log(constraints

  const renderValidationErrors = () => {
    // const nameErrors = [];
    let nameErrorsComponent;
    if (validationErrors.name) {
      nameErrorsComponent = (
        <div className="name-errors">
          {validationErrors.name.map((errorMsg, idx) => (
            <h3 key={errorMsg.slice(0, 6).concat(idx)}>{errorMsg}</h3>
          ))}
        </div>
      );
    }
    let emailErrorsComponent;
    if (validationErrors.email) {
      emailErrorsComponent = (
        <div className="email-errors">
          <h3>{validationErrors.email}</h3>
        </div>
      );
    }
    let passwordErrorsComponent;
    if (validationErrors.password) {
      passwordErrorsComponent = (
        <div className="password-errors">
          <h3>{validationErrors.password}</h3>
        </div>
      );
    }
    const component = (
      <div className="validation-errors-container">
        {nameErrorsComponent && nameErrorsComponent}
        {emailErrorsComponent && emailErrorsComponent}
        {passwordErrorsComponent && passwordErrorsComponent}
      </div>
    );
    return component;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    setHideErrorBox(false);
    setValidationErrors({});
    // let readyToSend = false;
    // const errorsArray = [];
    // if (password !== confirmPassword) {
    //   const errorMsg =
    //     "Confirm Password field must be the same as the Password field";
    //   errorsArray.push(errorMsg);
    // }
    // if (name.isTooShort) {
    //   const errorMsg = "name must contain from 3 to 30 characters.";
    //   errorsArray.push(errorMsg);
    // }
    // if (name.isEmail) {
    //   const errorMsg = "name must not be an email address.";
    //   errorsArray.push(errorMsg);
    // }
    // if (email.isNotEmail) {
    //   const errorMsg = "email must be valid format.";
    //   errorsArray.push(errorMsg);
    // }

    // setErrors(errorsArray);

    if (validateInputs()) {
      console.log("dispatch route reached.");
      // setErrors([]);
      // return dispatch(sessionActions.signup({ name, email, password })).catch(
      //   async (res) => {
      //     let data;
      //     try {
      //       data = await res.clone().json();
      //     } catch {
      //       data = await res.text();
      //     }
      //     if (data?.errors) setErrors(data.errors);
      //     else if (data) setErrors([data]);
      //     else setErrors([res.statusText]);
      //   }
      // );
    }
    // return;
  };

  const closeBox = () => setHideErrorBox(true);

  const ErrorBox = () => {
    if (errors.length > 0 && !hideErrorBox) {
      return (
        <div id="signup-errors">
          <ul>
            {errors.map((error) => (
              <li className="error-line" key={error}>
                {error}
              </li>
            ))}
          </ul>

          <button id="closeBoxButton" onClick={closeBox}>
            x
          </button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const handleTOSClick = (type) => {
    console.log(type);
  };

  console.log(validationErrorsExist);
  console.log(validationErrors);
  return (
    <>
      <div>
        <ErrorBox />
      </div>
      <div className="signup-page-container">
        <div className="signup-left">
          <div className="top-text">
            <h2>Sign Up for Yup</h2>
            <h3>Connect with great local businesses</h3>
            <p>
              By continuing, you agree to Yup's{" "}
              <span className="link" onClick={() => handleTOSClick("tos")}>
                Terms of Service
              </span>{" "}
              and acknowledge Yup's{" "}
              <span className="link" onClick={() => handleTOSClick("privacy")}>
                Privacy Policy
              </span>
              .
            </p>
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            <label>
              <input
                className={
                  errors.length > 0 ? "error-input-field" : "input-field"
                }
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                className={
                  errors.length > 0 ? "error-input-field" : "input-field"
                }
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                className={
                  errors.length > 0 ? "error-input-field" : "input-field"
                }
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                className={
                  errors.length > 0 ? "error-input-field" : "input-field"
                }
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button id="sign-up-button">Sign Up</button>
          </form>
          <div className="login-footer">
            Already on Yup? <a href="/login">Log in</a>
          </div>
          {validationErrorsExist && renderValidationErrors()}
        </div>
        <div className="signup-right">
          <LoginImage />
        </div>
      </div>
    </>
  );
};

export default SignupFormPage;
