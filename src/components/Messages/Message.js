import React from "react";
import moment from "moment";

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "message-content" : "";
};

const isImage = message => {
  return message.hasOwnProperty("image") && !message.hasOwnProperty("message-content");
};

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => (
  <div className="message">
    <hr/>
      <img 
        className="message-avatar" 
        src={message.user.avatar}
        alt="messageAvatar" 
      />
      <a href="#!" className="message-author">{message.user.name}</a>
      <div className="message-time">{timeFromNow(message.timestamp)}</div>
      <div className={isOwnMessage(message, user)}>
        {isImage(message) ? (
          <img 
            src={message.image} 
            className="message-image"
            alt="messageImage"
          />
        ) : (
          <div className="message-text">{message.content}</div>
        )}
      </div>
  </div>
);

export default Message;