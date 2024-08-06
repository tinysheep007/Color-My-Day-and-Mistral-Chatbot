'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Chatbot() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "system",
      message: "Hi! Ask me or tell me anything! I am mistralai/Mistral-Nemo-Instruct-2407."
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleText = async () => {
    if (message.trim()) {

      setChatHistory([...chatHistory, { role: "user", message }]);
      setIsGenerating(true);
      setMessage(""); 

      try {
        const res = await axios.post("/api/chat", { userMessage: message });
        const botResponse = res.data.reply;

        setChatHistory(prevHistory => [
          ...prevHistory,
          { role: "system", message: "Model is thinking hard..." }
        ]);

        setTimeout(() => {
          setChatHistory(prevHistory => [
            // get rid of old MODEL IS THINKING HARD...
            ...prevHistory.slice(0, -1), 
            { role: "system", message: botResponse }
          ]);
        }, 1000); 

      } catch (error) {
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

        {/* New div with border */}
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
