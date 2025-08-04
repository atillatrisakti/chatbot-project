import React from 'react';
import styles from './InputField.module.css';

const InputField = (props) => {
  return <input className={styles.input} {...props} />;
};

export default InputField;
