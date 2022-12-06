import { useState } from "react";
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

  return (
    <>
      <div className="login-page-container">
        <div className="login-left">
          <form onSubmit={handleSubmit} className="login-form">
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
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
