import React from "react";

export const NoticeMessages = ({messages}) =>{
    const noticeMessages = messages || [];
    if (!noticeMessages.length) return null; 
    return (
        <div className="notice-container">
            <ul className="notice-list">
                {noticeMessages.map((nmsg, i) => <li key={i} className="notice-message">{nmsg}</li>)}
            </ul>
        </div>);
}

export default NoticeMessages;