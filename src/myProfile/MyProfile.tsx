import { Box, Button, List, ListItem, ListItemButton } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";
import AboutMe from "./leftBar/AboutMe";
import School from "./leftBar/School";
import Work from "./leftBar/Work";
import Projects from "./leftBar/Projects";
import Hobbies from "./leftBar/Hobbies";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ProfileFoto from "./leftBar/ProfileFoto.jpg"


const components = {
  AboutMe: <AboutMe />,
  School: <School />,
  works: <Work />,
  Projects: <Projects />,
  Hobbies: <Hobbies />,
};

export default function MyProfile() {
  const [activeComponent, setActiveComponent] =
    useState<keyof typeof components>("AboutMe");
  const navigate = useNavigate();

  const backOnProject = () => {
    navigate(`/workingPage`);
  };

  const handleClick = (component: keyof typeof components) => {
    setActiveComponent(component);
  };

  const onDownloadCV=()=>{
    const link = document.createElement("a");
    link.href = "/documents/Životopis-CV.docx"; // Cesta k souboru (musí být ve složce `public`)
    link.download = "Životopis-CV.docx"; // Název souboru pro stažení
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="styleSite">
      <div className="header">
        <Button
          onClick={backOnProject}
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Home
        </Button>
        
        <h1>Daniel Kohoutek</h1>
        
        <div className="fotoProfile"><img src={ProfileFoto} alt= "MyProfileFoto"/></div>
      </div>
      <div className="side">
        <div className="leftBar">
          {Object.keys(components).map((key) => (
            <ListItemButton
              key={key}
              onClick={() => handleClick(key as keyof typeof components)}
              sx={{
                border: "1px solid",
                borderRadius: "4px",
                textAlign: "left",
                bgcolor: activeComponent === key ? "primary.main" : " #ADD8E6;",
                color: activeComponent === key ? "white" : "text.primary",
                transition: "all 0.3s",
                fontSize: "0.85rem",
                padding: "10px",
                marginBottom: "3px",
                "&:hover": {
                  bgcolor:
                    activeComponent === key ? "primary.dark" : "grey.200",
                },
              }}
            >{`${key.charAt(0).toUpperCase() + key.slice(1)}`}</ListItemButton>
          ))}
        </div>
        <Box
          sx={{
            padding: "16px",
            border: "1px solid",
            borderRadius: "8px",
            bgcolor: "grey.100",
            boxShadow: 1,
            height: "60%",
            width: { xs: "90%", sm: "70%", md: "50%" },
            margin: "auto",
          }}
        >
          {components[activeComponent]}
        </Box>
        <div className="rightBar">
          <List sx={{ marginLeft: "10%", width: "90%", padding: 0,
          "@media (max-width: 600px)": {
                 display:"flex",
                flexDirection:"row",
                justifyContent:"space-evenly",
                marginLeft:"5%",
              // Pro menší obrazovky
              }, }}>
            <ListItem
              sx={{
                backgroundColor: "#87CEFA",
                color: "black",
                borderRadius: "8px",
                padding: "8px 16px",
                marginBottom: "8px",
                "@media (max-width: 600px)": {
                maxWidth:"8rem",
                maxHeight:"5vh",
              },
                "&:hover": {
                  backgroundColor: "#00BFFF",
                  color: "white",
                },
              }}
            >
              <LinkedInIcon sx={{ marginRight: "8px" }} />
              <a
                href="https://sk.linkedin.com/in/daniel-kohoutek-6b271ba1?trk=people-guest_people_search-card"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </ListItem>
            <ListItem
              sx={{
                backgroundColor: "#24292e",
                color: "white",
                borderRadius: "8px",
                padding: "8px 16px",
                "@media (max-width: 600px)": {
                maxWidth:"8rem",
                maxHeight:"5vh",
              },
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <GitHubIcon sx={{ marginRight: "8px" }} />
              <a
                href="https://github.com/Dannirl6378?tab=repositories"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
             
            </ListItem>
            <ListItem
              sx={{
                color: "white",
                borderRadius: "8px",
                padding: "8px 0px",
                marginBottom: "8px",
                "@media (max-width: 600px)": {
                maxWidth:"8rem",
                height:"5vh",
              },
                
              }}
            >
            <Button variant="contained" sx={{width:"7rem",height:"5vh",fontSize:"small",}} onClick={onDownloadCV}>Download CV</Button>
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}