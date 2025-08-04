# Assistant Bot

![Node.js](https://img.shields.io/badge/Node.js-20.x-blue?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

An intelligent web-based chatbot application powered by Gemini AI, capable of responding to text, images, and audio inputs. Built with a modern tech stack featuring React on the front-end and Node.js/Express on the back-end.

## Key Features

- **Text-Based Chat:** Engage in intelligent conversations with the AI.
- **Image and Text Input:** Generate responses from a combination of image and text prompts.
- **Audio and Text Input:** Get answers by providing an audio file along with a text query.
- **Responsive Design:** Clean and intuitive user interface that works seamlessly across devices.
- **Copy AI Responses:** Easily copy the generated answers to your clipboard.

## Tech Stack

### Front-end

- **Library:** React
- **Language:** JavaScript
- **Styling:** CSS Modules
- **Design System:** Atomic Design
- **Build Tool:** Vite

### Back-end

- **Runtime:** Node.js
- **Framework:** Express
- **AI:** Google Gemini SDK
- **File Handling:** Multer for multipart/form-data

## Installation and Setup

Follow these steps to get the project up and running on your local machine.

### Back-end Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/atillatrisakti/chatbot-project.git
    ```

2.  **Navigate to the back-end directory:**

    ```bash
    cd assistant-bot/back-end
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Create the environment file:**
    Duplicate the `.env.example` file and rename it to `.env`.

    ```bash
    cp .env.example .env
    ```

5.  **Configure environment variables:**
    Open the `.env` file and add your Google Gemini API key and a port number.

### Front-end Setup

1.  **Navigate to the front-end directory:**

    ```bash
    cd ../front-end
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables (if needed):**
    The front-end uses `VITE_APP_API_URL` to connect to the back-end. By default, it points to `http://localhost:5000`. If your back-end runs on a different URL, create a `.env` file and set the variable:
    ```
    VITE_APP_API_URL=http://your-backend-url
    ```

## Running the Application

1.  **Run the back-end server:**
    From the `back-end` directory, run:

    ```bash
    npm run dev
    ```

    The server will start on the port specified in your `.env` file (e.g., `http://localhost:5000`).

2.  **Run the front-end application:**
    From the `front-end` directory, run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Environment Variables

### Backend (`back-end/.env`)

```
# Your Google Gemini API Key
API_KEY="xxxxxxxxxxxxxxxxxxxx"

# Port for the server to run on
PORT=5000
```

## API Endpoints (Backend)

The back-end provides the following endpoints to interact with the Gemini AI.

| Method | Endpoint               | Description                                              |
| :----- | :--------------------- | :------------------------------------------------------- |
| `POST` | `/chat`                | Generates a response from a text prompt.                 |
| `POST` | `/generate-from-image` | Generates a response from an image and text prompt.      |
| `POST` | `/generate-from-audio` | Generates a response from an audio file and text prompt. |

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
