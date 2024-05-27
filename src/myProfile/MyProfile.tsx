import { Button } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const navigate = useNavigate();

  const backOnProject = () => {
    navigate(`/workingPage`);
  };
  return (
    <div className="styleSite">
      <div>
        <Button onClick={backOnProject}></Button>
        <h1>My profile</h1>
      </div>
      <div className="foto">
        <div>{/*tady bude foto a bude tu displayFlex a jmeno pod sebou*/}</div>
        <div className="myInfo">
          <h3>Working Experience</h3>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="AboutMe">
        <h3>My Hobbies</h3>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div className="myProjects">
        {/*tady budou odkazy na moje male projekty a nebo je sem integruji uvdime*/}
      </div>
    </div>
  );
}
