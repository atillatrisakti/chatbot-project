import React from "react";
import styles from "./WelcomeScreen.module.css";
import Icon from "../atoms/Icon"; // Assuming you have a generic or app-specific icon

const WelcomeScreen = () => {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        {/* Replace with your actual logo or a more specific icon */}
        <h1 className={styles.title}>Assistant Bot</h1>
        <p className={styles.subtitle}>Powered by Gemini</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
