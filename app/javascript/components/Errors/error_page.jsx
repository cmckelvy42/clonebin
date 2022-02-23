import React from "react";

export const ErrorPage = ({status}) => {
    switch (status) {
        case 404:
            return(
                <div className="content-container">
                    <div className="content-title">404 Not Found</div>
                    <div className="content-text">Page not found.</div>
                </div>
            )
        case 403:
            return(
                <div className="content-container">
                    <div className="content-title">403 Forbidden</div>
                    <div className="content-text">You're not allowed to do that.</div>
                </div>
            )
        case 422:
            return(
                <div className="content-container">
                    <div className="content-title">422 Unprocessable Entry</div>
                    <div className="content-text">Invalid request format.</div>
                </div>
            )
        case 401:
            return(
                <div className="content-container">
                    <div className="content-title">401 Unauthorized</div>
                    <div className="content-text">You must be signed in to do that.</div>
                </div>
            )
        default:
            return(
                    <div className="content-container">
                        <div className="content-title">???</div>
                        <div className="content-text">How did you get here?</div>
                    </div>
            )
    }
}

export default ErrorPage;