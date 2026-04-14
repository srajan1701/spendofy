import { useState } from "react";
import axios from "axios";
import "../styles/importExport.css";

export default function ImportCSV() {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleImport = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/api/import", formData);
    alert("Imported ✅");
  };

  return (
    <div className="import-export-page">
      <div
        className="card"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="title">Drag & Drop CSV</div>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="input"
        />

        <button className="btn" onClick={handleImport}>
          Import
        </button>
      </div>
    </div>
  );
}