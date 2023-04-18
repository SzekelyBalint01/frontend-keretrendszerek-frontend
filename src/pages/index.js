import React, { useState, useRef } from "react";
import "./Home.css";

function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const inputRef = useRef(null);

  const handleFileSelect = () => {
    inputRef.current.click();
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDownload = () => {
    if (downloadReady) {
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "result.txt");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setDownloadReady(false);

    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:8081/textTranslate", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "result.txt");
        document.body.appendChild(link);
        setDownloadReady(true);
        setLoading(false);
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("There was an error downloading the file", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="container">
        <h1>Upload Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="button-wrapper">
            <button type="button" onClick={handleFileSelect}>
              Select file
            </button>
            {file && <span className="right-arrow">&rarr;</span>}
            {file && (
              <button
                type="submit"
                disabled={!file || loading}
                className={loading ? "blink" : ""}
              >
                {loading ? "Processing..." : "Upload"}
              </button>
            )}
            {downloadReady ? (
              <div className="result-buttons">
                <div class="arrow">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <button
                  type="button"
                  disabled={!downloadReady}
                  onClick={handleDownload}
                  className={downloadReady ? "ready" : ""}
                >
                  {downloadReady ? "Download" : "Download"}
                </button>
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <input
            type="file"
            accept=".txt"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </form>
        <div className="text-boxes">
          <div className="language-container">
            <div className="language">
              <p>Angol</p>
            </div>
            <div class="scrollable-text-left"></div>
          </div>
          <div className="language-container">
            <div className="language">
              <p>Magyar</p>
            </div>
            <div class="scrollable-text-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
