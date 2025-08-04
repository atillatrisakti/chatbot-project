import React from 'react';
import styles from './TypingIndicator.module.css';

const TypingIndicator = () => (
  <div className={styles.typingContainer}>
    <div className={styles.typingBubble}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  </div>
);

export default TypingIndicator;
