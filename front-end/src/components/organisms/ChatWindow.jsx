import React, { useRef, useEffect } from 'react';
import MessageBubble from '../molecules/MessageBubble';
import styles from './ChatWindow.module.css';

import TypingIndicator from '../molecules/TypingIndicator';

const ChatWindow = ({ messages, isSending }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.window}>
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg.content} role={msg.role} file={msg.file} />
      ))}
      {isSending && <TypingIndicator />}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;
