'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Chatbot() {
  const router = useRouter();
  // store current user message
  const [message, setMessage] = useState("");
  // stores all existing texts from both user and system
  const [chatHistory, setChatHistory] = useState([
    {
      role: "system",
      message: "Hi! Ask me or tell me anything! I am mistralai/Mistral-Nemo-Instruct-2407."
    }
  ]);
  // check if model is running(loading response)
  const [isGenerating, setIsGenerating] = useState(false);

  // function that handles submit message to chatbot
  const handleText = async () => {
    // if input exissts
    if (message.trim()) {
      // attach previous chatHistory and add addtional user messag that we just submited
      setChatHistory([...chatHistory, { role: "user", message }]);
      // we started waiting for model to response
      setIsGenerating(true);
      // clear input field
      setMessage(""); 

      try {
        // get the result from backend(hugging face API)
        const res = await axios.post("/api/chat", { userMessage: message });

        // get the reply property of our json object
        const botResponse = res.data.reply;

        // add model is loading prompt for users to know
        setChatHistory(prevHistory => [
          ...prevHistory,
          { role: "system", message: "Model is thinking hard..." }
        ]);

        // after 1 second timeout, load the response in and add to chat history
        // also get rid of old MODEL IS THINKING HARD...
        setTimeout(() => {
          setChatHistory(prevHistory => [
            ...prevHistory.slice(0, -1), 
            { role: "system", message: botResponse }
          ]);
        }, 1000); 

      } catch (error) {
        // handle error case add error text to chat history
        console.error("Error sending message: ", error);
        setChatHistory(prevHistory => [
          ...prevHistory,
          { role: "system", message: "Something went wrong. Please try again." }
        ]);
      } finally {
        setIsGenerating(false); 
      }

      
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-100">
      <div className="flex-grow flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Chatbot</h1>
        <button
          className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => router.push("/")}
        >
          Color My Day
        </button>

        <div className="w-full max-w-2xl border-2 border-black p-4 rounded-lg bg-white">
          <div className="flex flex-col space-y-4 mb-4">
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg max-w-md ${
                  entry.role === "system"
                    ? "bg-gray-300 text-gray-800 self-start"
                    : "bg-blue-500 text-white self-end"
                }`}
              >
                <p>{entry.message}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleText}
              disabled={isGenerating}
            >
              {isGenerating ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
