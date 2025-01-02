import { Button } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";

export default function MyProfile() {
  const navigate = useNavigate();

  const backOnProject = () => {
    navigate(`/workingPage`);
  };
  return (
    <div className="styleSite">
      <div className="header">
        <Button onClick={backOnProject}>Home</Button>
        <h1>Daniel kohoutek</h1>
        <div>Foto</div>
      </div>
      <div className="side">
        <div className="leftBar">
          About Me 
          School 
          Works 
          hobies
          Someting about my projects
          </div>
        <div className="contentBar">Tady se to bdue vše zobrazovat </div>
        <div className="rigthBar">Tady bude něco jako email instagram github linkedin facebook</div>
      </div>
    </div>
  );
}
