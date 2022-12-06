import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import LoginImage from "./LoginImage";
// import ErrorBox from "../ErrorBox";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  // original code
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // debugger;

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

  // benchbnb phase 5-6
  // const [errors, handleSubmit] = useSubmit({
  //   createAction: () => {

  //   }
  // })

  // debugger;
  console.log(errors);
  // let errorsExist = errors ? true : false;

  const ErrorBox = () => {
    if (errors.length > 0) {
      return (
        <div id="login-errors">
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <p>x</p>
        </div>
      );
    } else {
      return <></>;
    }
  };

  // const errorBox = () => <ErrorBox />;

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
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              <input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button>Login</button>
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
