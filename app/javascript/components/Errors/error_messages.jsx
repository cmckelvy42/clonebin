import React from "react";
import { useSelector } from "react-redux";

export const ErrorMessages = () =>{
    const errors = useSelector(state=>state.errors);
    const errorMessages = errors.errors || [];
    if (errorMessages.length === 0) return null; 
    return (
        <div className="error-container">
            <ul className="error-list">
                {errorMessages.map((emsg, i) => <li key={i} className="error-message">{emsg}</li>)}
            </ul>
        </div>);
}

export default ErrorMessages;