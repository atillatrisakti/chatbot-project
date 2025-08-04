import React, { useState } from 'react';
import styles from './MessageBubble.module.css';
import Markdown from 'react-markdown';
import UserIcon from '../../assets/icons/UserIcon';
import BotIcon from '../../assets/icons/BotIcon';
import CopyIcon from '../../assets/icons/CopyIcon';
import CheckIcon from '../../assets/icons/CheckIcon';

const MessageBubble = ({ message, role, file }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = role === 'user';
  const bubbleContainerClass = isUser ? styles.userContainer : styles.aiContainer;

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className={`${styles.bubbleContainer} ${bubbleContainerClass}`}>
      {!isUser && <BotIcon />}
      <div className={styles.bubbleWrapper}>
        <div className={styles.bubble}>
          {file && (
            <div className={styles.fileContainer}>
              {file.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(file)} alt="Attachment" className={styles.attachedImage} />
              ) : (
                <audio controls src={URL.createObjectURL(file)} className={styles.attachedAudio} />
              )}
            </div>
          )}
          <Markdown>{message}</Markdown>
        </div>
        {!isUser && (
          <div className={styles.copyIcon} onClick={handleCopy}>
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </div>
        )}
      </div>
      {isUser && <UserIcon />}
    </div>
  );
};

export default MessageBubble;
