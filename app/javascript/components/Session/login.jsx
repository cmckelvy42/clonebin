import React, {useEffect, useState} from "react";
import {getCSRFToken} from '../../util/misc'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/user_actions";
import ErrorMessages from "../Errors/error_messages";
import { clearErrors } from "../../actions/error_actions";

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = (user) => dispatch(login(user));
  const csrf_token = getCSRFToken();
  const handleInput = (type) => {
    if (type === "name"){
      return (e) => setName(e.target.value);
    } else if (type === "password") {
      return (e) => setPassword(e.target.value);
    }
    else return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearErrors());
    const user = {name: name, password:password};
    loginUser(user);
    setName("");
    setPassword("");
  }

  useEffect( () => () => dispatch(clearErrors()), [] );
  
  return(
    <div className="content">
      <div className="session-form">
        <ErrorMessages/>
        <div className="content-title">Login</div>
        <form>
          <input
          type="hidden"
          name="authenticity_token"
          value={csrf_token}
          />
          <div className="session-form-group">
            <label htmlFor="login-name">Username:</label>
            <input
              id="login-name"
              type="text"
              value={name}
              onChange={handleInput('name')}
            />
          </div>
          <div className="session-form-group">
            <label htmlFor="login-password">Password:</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={handleInput('password')}
            />
              <button onClick={handleSubmit}>Log In!</button>
          </div>
        </form>
      </div>
    </div>
  );
}
  
  export default Login;