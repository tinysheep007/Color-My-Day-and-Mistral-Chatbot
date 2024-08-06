'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { emotionConfig } from "./config";
import { ColorRing } from "react-loader-spinner";

export default function Home() {
  const router = useRouter();
  const defaultColor = "#f5dff1";
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [APIresult, setAPIResult] = useState([]);
  const [displayMode, setDisplayMode] = useState("all"); // "all" or "top3"
  const [emotionColor, setEmotionColor] = useState(defaultColor);
  const [resultVisible, setResultVisible] = useState(false);

  const predict = async () => {
    if(input){
      setLoading(true);
      setResultVisible(false);
      try {
        const response = await axios.post("/api/emotion", { input });
        setAPIResult(response.data.result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      predict();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [input]);

  useEffect(() => {
    if (APIresult && APIresult.length > 0) {
      changeColor(APIresult[0].label);
      setResultVisible(true);
    }
  }, [APIresult]);

  const handleToggleChange = (event) => {
    setDisplayMode(event.target.checked ? "top3" : "all");
  };

  const filteredResults = displayMode === "top3" ? APIresult.slice(0, 3) : APIresult;

  function changeColor(label) {
    if (APIresult && APIresult.length > 0) {
      const colorHex = emotionConfig[label].colorHex;
      setEmotionColor(colorHex);
    }
  }

  return (
    <main style={{ backgroundColor: emotionColor }} className="transition-background-color duration-500 ease-in-out flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-800">🧑‍🎨️ Color My Day 🖌</h1>
      <button className="mb-6 p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300" onClick={() => router.push("/chatbot")}>Chatbot</button>
      <div className="w-full max-w-lg">
        <textarea
          className="w-full p-4 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner transition-shadow duration-300"
          style={{ 
            borderColor: 'black', 
            borderWidth: '2px', // Adjust thickness as needed
            backgroundColor: 'rgba(255, 255, 255, 0.5)' // Translucent white background
          }}
          placeholder="Type here ..."
          onChange={(e) => setInput(e.target.value)}
        />


      </div>

      <div className="w-full max-w-lg flex items-center mb-6">
        <label className="inline-flex items-center text-gray-700">
          <span className="mr-3 text-lg">Only Show Top 3 Emotions</span>
          <input
            type="checkbox"
            className="form-checkbox h-6 w-6 text-blue-500"
            checked={displayMode === "top3"}
            onChange={handleToggleChange}
          />
        </label>
      </div>

      <div className="w-full max-w-lg">
        <div className="w-full max-w-lg mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-md text-yellow-800 text-lg font-semibold">
          First Usage Response Takes about 8-10 seconds.
        </div>

        {loading ? (
          <div className="text-gray-500 text-lg">Loading...</div>
        ) : (
          filteredResults && filteredResults.length > 0 ? (
            filteredResults.map((e, index) => (
              <div
                key={index}
                className={`p-4 mb-4 border rounded-lg bg-white shadow-md transition-opacity duration-800 ease-in-out ${resultVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="font-semibold text-xl text-gray-800">{e.label} {emotionConfig[e.label]?.emoji}</div>
                <div className="text-gray-600 text-lg">{e.score}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-lg">No results found</div>
          )
        )}

        {
          loading && (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />
          )
        }
      </div>
    </main>
  );
}
