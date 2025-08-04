import React, { useState, useRef } from 'react';
import InputField from '../atoms/InputField';
import Icon from '../atoms/Icon';
import styles from './ChatInput.module.css';

const ChatInput = ({ onSendMessage, isSending }) => {
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!prompt.trim() && !file) return;

    let mode = 'chat';
    if (file) {
      mode = file.type.startsWith('image/') ? 'image' : 'audio';
    }

    onSendMessage(prompt, mode, file);
    setPrompt('');
    setFile(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    // Reset the file input's value
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className={styles.inputContainer}>
      {file && (
        <div className={styles.previewContainer}>
          {file.type.startsWith('image/') ? (
            <img src={URL.createObjectURL(file)} alt="Preview" className={styles.previewImage} />
          ) : (
            <audio controls src={URL.createObjectURL(file)} className={styles.previewAudio} />
          )}
          <button onClick={handleRemoveFile} className={styles.removeButton}>X</button>
        </div>
      )}
      <div className={styles.inputWrapper}>
        <button className={styles.iconButton} onClick={() => fileInputRef.current.click()}>
          <Icon name="attach" />
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*,audio/*" 
          onChange={handleFileChange}
        />

        <InputField 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Kirim pesan..."
          onKeyPress={(e) => e.key === 'Enter' && !isSending && handleSend()}
          disabled={isSending}
        />

        <button className={styles.sendButton} onClick={handleSend} disabled={isSending}>
          <Icon name="send" color="var(--accent-color)" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
