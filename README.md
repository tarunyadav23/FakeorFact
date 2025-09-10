# FakeorFact: An AI-Powered News Analyzer

FakeorFact is a web application designed to combat misinformation by helping users analyze and verify the authenticity of news articles. By leveraging modern AI and natural language processing, the app provides instant summaries, fake news detection, and highlights key indicators of potentially misleading content.

## Features

* **AI Summarization:** Utilizes advanced models to distill long news articles into concise and easy-to-read summaries.
* **Fake News Detection:** Employs a fine-tuned BERT model (`mrm8488/bert-tiny-finetuned-fake-news-detection`) to classify articles as either "Likely Real" or "Likely Fake".
* **Confidence Scoring:** Provides a percentage-based confidence score for each analysis, giving users insight into the reliability of the classification.
* **Suspicious Word Highlighting:** Automatically identifies and highlights words like "breaking," "shocking," and "exclusive" that are often used in sensationalist and fake news headlines.
* **Privacy-First:** The frontend of the application is designed to simulate the analysis process, while the backend is set up to handle the actual AI model inference.

## Technology Stack

* **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn-ui.
* **Backend:** FastAPI, Transformers, PyTorch.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_GIT_URL>
    cd <YOUR_PROJECT_NAME>
    ```

2.  **Set up the backend:**
    Navigate to the `backend` directory and install the required Python packages.
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

3.  **Start the backend server:**
    Run the FastAPI server.
    ```bash
    uvicorn main:app --reload
    ```

4.  **Set up the frontend:**
    In a new terminal, navigate back to the root directory and install the Node.js dependencies.
    ```bash
    cd ..
    npm install
    ```

5.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
The application should now be running on `http://localhost:5173`.