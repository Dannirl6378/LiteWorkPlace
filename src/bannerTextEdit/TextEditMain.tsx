import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { modules } from "./Modules"; // Import modules
import { formats } from "./Format"; // Import formats
import "./TextEditor.css"; // Import the CSS file

interface TextEditProps {
  onContentChange: (content: string) => void; // content bude HTML
  quillContent: string; // Obsah ve formátu HTML
}

const TextEdit: React.FC<TextEditProps> = ({
  onContentChange,
  quillContent,
}) => {
  const [content, setContent] = useState(quillContent);
  const [switchState, setSwitch] = useState(true);

  const quillRef = useRef<ReactQuill | null>(null);
  console.log("content", quillContent);

  const textIsInDb = useRef(true);

  console.log("quillContent", content);
  // Funkce na odstranění escape znaků z HTML
  const unescapeHtml = (html: string) => {
    let cleanedHtml = html;
    cleanedHtml = cleanedHtml.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    if (cleanedHtml.startsWith('"') && cleanedHtml.endsWith('"')) {
      cleanedHtml = cleanedHtml.slice(1, -1);
    }
    return cleanedHtml;
  };

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const cleanedQuill = unescapeHtml(quillContent);
      console.log("cleanQuill", cleanedQuill);
      editor.clipboard.dangerouslyPasteHTML(cleanedQuill);

      // Můžeme nastavit stav pouze pro inicializaci
      setContent(cleanedQuill);
      textIsInDb.current=false;
    }
  }, [textIsInDb.current]);

  const handleAddContent = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const htmlContent = editor.root.innerHTML;

      setContent(htmlContent);
      onContentChange(htmlContent);
      console.log("htmlcontent",htmlContent);
    }
  };

  return (
    <div className="positionTextEdit">
      <div className="text-editor-container">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          placeholder="Write your content..."
          onChange={handleAddContent}
          className="text-editor"
        />
      </div>
    </div>
  );
};

export default TextEdit;
