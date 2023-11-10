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

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    setHideErrorBox(false);
    let readyToSend = false;
    const errorsArray = [];
    if (password !== confirmPassword) {
      const errorMsg =
        "Confirm Password field must be the same as the Password field";
      errorsArray.push(errorMsg);
    }
    if (name.isTooShort) {
      const errorMsg = "name must contain from 3 to 30 characters.";
      errorsArray.push(errorMsg);
    }
    if (name.isEmail) {
      const errorMsg = "name must not be an email address.";
    }
    if (email.isNotEmail) {
      const errorMsg = "email must be valid format.";
    }

    setErrors(errorsArray);

    if (readyToSend) {
      setErrors([]);
      return dispatch(sessionActions.signup({ name, email, password })).catch(
        async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        }
      );
    }
    return;
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
              By continuing, you agree to Yup's <a href="#">Terms of Service</a>{" "}
              and acknowledge Yup's <a href="#">Privacy Policy</a>.
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
        </div>
        <div className="signup-right">
          <LoginImage />
        </div>
      </div>
    </>
  );
};

export default SignupFormPage;
