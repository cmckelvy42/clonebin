import React, {useState, useEffect} from "react";
import {getCSRFToken} from '../../util/misc'
import { useDispatch } from "react-redux";
import { createNewUser } from "../../actions/user_actions";
import ErrorMessages from "../Errors/error_messages";
import { clearErrors } from "../../actions/error_actions";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const createUser = (user) => dispatch(createNewUser(user));
  const csrf_token = getCSRFToken();
  const handleInput = (type) => {
    if (type === "email"){
        return (e) => setEmail(e.target.value);
    } else if (type === "password") {
        return (e) => setPassword(e.target.value);
    } else if (type === "name") {
        return (e) => setName(e.target.value);
    }
    else return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearErrors());
    const user = {email: email, password:password, name:name};
    createUser(user);
    setPassword("");
  }

  useEffect( () => () => dispatch(clearErrors()), [] );
  

  return(
    <div className="content">
      <div className="session-form">
        <ErrorMessages/>
        <div className="content-title">Sign Up</div>
        <form>
          <input
          type="hidden"
          name="authenticity_token"
          value={csrf_token}
          />
          <div className="session-form-group">
            <label htmlFor="signup-username">Username:</label>
            <input
              id="signup-username"
              type="text"
              value={name}
              onChange={handleInput('name')}
            />
          </div>
          <div className="session-form-group">
            <label htmlFor="signup-email">Email:</label>
            <input
              id="signup-email"
              type="text"
              value={email}
              onChange={handleInput('email')}
            />
          </div>
          <div className="session-form-group">
            <label htmlFor="signup-password">Password:</label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={handleInput('password')}
            />
              <button onClick={handleSubmit}>Sign Up!</button>
          </div>
        </form>
      </div>
    </div>
  );
}
  
  export default Signup;