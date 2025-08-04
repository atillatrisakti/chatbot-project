const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Generates a response from the chatbot based on a series of messages.
 * @param {Array<Object>} messages - The history of the conversation.
 * @returns {Promise<Object>} - The AI's response.
 */
export const generateChat = async (messages) => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Generates a response from an image and a prompt.
 * @param {string} prompt - The text prompt.
 * @param {File} imageFile - The image file to upload.
 * @returns {Promise<Object>} - The AI's response.
 */
export const generateFromImage = async (prompt, imageFile) => {
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("image", imageFile);

  const response = await fetch(`${API_BASE_URL}/generate-from-image`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Generates a response from an audio file and a prompt.
 * @param {string} prompt - The text prompt.
 * @param {File} audioFile - The audio file to upload.
 * @returns {Promise<Object>} - The AI's response.
 */
export const generateFromAudio = async (prompt, audioFile) => {
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("audio", audioFile);

  const response = await fetch(`${API_BASE_URL}/generate-from-audio`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
