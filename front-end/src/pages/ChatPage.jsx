import React, { useState } from 'react';
import ChatWindow from '../components/organisms/ChatWindow';
import ChatInput from '../components/molecules/ChatInput';
import WelcomeScreen from '../components/organisms/WelcomeScreen';
import Logo from '../components/atoms/Logo';
import styles from './ChatPage.module.css';
import { generateChat, generateFromImage, generateFromAudio } from '../services/api';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (prompt, mode, file) => {
    setIsSending(true);
    const newUserMessage = { role: 'user', content: prompt, file };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      let response;
      if (mode === 'chat') {
        // For chat, we send the whole history
        const history = [...messages, newUserMessage];
        response = await generateChat(history);
      } else if (mode === 'image') {
        response = await generateFromImage(prompt, file);
      } else if (mode === 'audio') {
        response = await generateFromAudio(prompt, file);
      }

      const aiMessage = { role: 'model', content: response.result }; // Assuming backend uses 'model' role
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { role: 'model', content: 'Sorry, something went wrong.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles.chatPage}>
      <Logo />
      {messages.length === 0 ? (
        <WelcomeScreen />
      ) : (
        <ChatWindow messages={messages} isSending={isSending} />
      )}
      <ChatInput onSendMessage={handleSendMessage} isSending={isSending} />
    </div>
  );
};

export default ChatPage;
