import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";

const App = () => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function codeReview() {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching code review:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white p-5 gap-5">
      {/* Left Panel (Code Editor) */}
      <div className="flex-1 bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col">
        <h2 className="text-xl font-semibold mb-3">Code Editor</h2>
        <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={15}
            className="text-sm font-mono bg-gray-900 text-white rounded-lg h-full"
          />
        </div>
        <button
          onClick={codeReview}
          className="mt-4 px-4 cursor-pointer py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-102"
          disabled={loading}
        >
          {loading ? "Reviewing..." : "Review Code"}
        </button>
      </div>

      {/* Right Panel (Review Output) */}
      <div className="flex-1 bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col max-h-screen">
        <h2 className="text-xl font-semibold mb-3">Code Review</h2>
        <div className="flex-1 overflow-auto border border-gray-700 p-3 rounded-lg bg-gray-900 prose prose-invert max-w-none text-gray-300">
          {loading ? <p className="text-center text-gray-400">Loading review...</p> : <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>}
        </div>
      </div>
    </main>
  );
};

export default App;
