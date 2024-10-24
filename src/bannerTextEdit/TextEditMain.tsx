import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { modules } from "./Modules"; // Import modules
import { formats } from "./Format"; // Import formats
import "./TextEditor.css"; // Import the CSS file



interface TextEditProps {
  onContentChange: (content: string) => void;
}
const TextEdit: React.FC<TextEditProps> = ({ onContentChange }) => {
  const [content, setContent] = useState("");

  const handleProcedureContentChange = (content: string) => {
    setContent(content);
    onContentChange(content);
    console.log("oncontent",content);
  };

  return (
    <div className="positionTextEdit">
      <h1 className="text-editor-heading"></h1>
      <div className="text-editor-container">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          placeholder="Write your content..."
          onChange={handleProcedureContentChange}
          className="text-editor"
        />
      </div>
    </div>
  );
};

export default TextEdit;
