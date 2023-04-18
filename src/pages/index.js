import React, { useState, useRef } from "react";

function Home() {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileSelect = () => {
    inputRef.current.click();
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
		fetch('http://localhost:8080/textTranslate',{
			method:"POST",
			body: formData,
		}
		)
		
		  .then(response => {
			if (!response.ok) {
			  throw new Error('Network response was not ok');
			}
			return response.blob();
		  })
		  .then(blob => {
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'file.txt');
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
		  })
		  .catch(error => {
			console.error('There was an error downloading the file', error);
		  });
	  
	  
  };

  return (
    <div>
      <h1>Upload Page</h1>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={handleFileSelect}>
          Select file
        </button>
        <input
          type="file"
          accept=".txt"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default Home;
