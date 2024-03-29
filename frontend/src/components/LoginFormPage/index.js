import { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import LoginImage from "./LoginImage";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const location = useLocation();
  // console.log(location);

  if (sessionUser) return <Redirect to="/" />;

  const toggleButtonAccess = (type) => {
    if (type === "ghost") {
      setSubmitClicked(true);
    }
    if (type === "unghost") {
      setSubmitClicked(false);
    }

    const buttons = document.querySelectorAll(".login-page-container button");
    buttons.forEach((button) => {
      if (type === "ghost") {
        button.classList.add("ghosted");
      }
      if (type === "unghost") {
        button.classList.remove("ghosted");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitClicked) return null;
    setHideErrorBox(false);
    setErrors([]);

    toggleButtonAccess("ghost");
    // setSubmitClicked(true);
    // const buttons = document.querySelectorAll(".login-page-container button");
    // buttons.forEach((button) => {
    //   button.classList.add("ghosted");
    // });

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
        toggleButtonAccess("unghost");
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
          <span className="link">Forgot password?</span>
        </div>
      );
  };

  const demoLoginClick = (e) => {
    e.preventDefault();

    if (submitClicked) return null;

    toggleButtonAccess("ghost");

    // const buttons = document.querySelectorAll(".login-page-container button");
    // buttons.forEach((button) => {
    //   button.classList.add("ghosted");
    // });
    // setSubmitClicked(true);
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
              By logging in, you agree to Yup's{" "}
              <span className="link">Terms of Service</span> and{" "}
              <span className="link">Privacy Policy</span>.
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
