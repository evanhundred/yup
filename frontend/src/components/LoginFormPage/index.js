import { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import "./LoginForm.css";
import LoginImage from "./LoginImage";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  console.log(location);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setHideErrorBox(false);
    setErrors([]);

    // console.log(email);
    // console.log(password);

    return dispatch(sessionActions.login({ email, password })).catch(
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
  };

  const closeBox = () => setHideErrorBox(true);

  const ErrorBox = () => {
    if (errors.length > 0 && !hideErrorBox) {
      return (
        <div id="login-errors">
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
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

  const ForgotPasswordLink = () => {
    if (errors.length > 0)
      return (
        <div className="forgot-password-link">
          <a href="#">Forgot password?</a>
        </div>
      );
  };

  const demoLoginClick = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ email: "john@email.io", password: "password" })
    );
  };

  return (
    <>
      <div>
        <ErrorBox />
      </div>
      <div className="login-page-container">
        <div className="login-left">
          <div className="top-text">
            <h2>Log in to Yup</h2>
            <h3>
              New to Yup? <a href="/signup">Sign up</a>
            </h3>
            <p>
              By logging in, you agree to Yup's <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>.
            </p>
          </div>
          <form className="login-form">
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
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <ForgotPasswordLink />
            <button id="login-button" onClick={handleSubmit}>
              Login
            </button>
            <button id="demo-login" onClick={demoLoginClick}>
              Demo User Login
            </button>
          </form>
        </div>
        <div className="login-right">
          <LoginImage />
        </div>
      </div>
    </>
  );
};

export default LoginFormPage;
