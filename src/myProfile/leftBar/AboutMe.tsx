import { Box, Button } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";

function AboutMe() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Box sx={{ lineHeight: 1.6,
      fontSize: "1rem",
      padding: "16px",
      height: "90%", // Výchozí pro desktop
      overflowY: "auto", // Povolí scrollování, pokud je obsah větší než výška
      "@media (max-width: 600px)": {
        height: "calc(48vh - 50px)", // Pevná výška na telefonech (odečteno 50px např. pro header/footer)
      },
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
      <h2 style={{ color: "#007bff", fontSize: "1.5rem", fontWeight: "bold" }}>
        {t("aboutMe")}
      </h2>
      <p>{t("introduction")}</p>
      <p>{t("currentlyLooking")}</p>
      <p>{t("projects")}</p>
      <p>{t("freeTime")}</p>

      <Button onClick={() => changeLanguage("en")} sx={{ marginRight: "8px" }}>
        English
      </Button>
      <Button onClick={() => changeLanguage("cs")}>Čeština</Button>
    </Box>
  );
}

export default AboutMe;

/*import { Box } from '@mui/material';
import * as React from 'react';

function AboutMe() {
    return (
        <Box sx={{ lineHeight: 1.6, fontSize: "1rem", padding: "16px", backgroundColor: "#f4f4f4", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ color: "#007bff", fontSize: "1.5rem", fontWeight: "bold" }}>About Me</h2>
            <p>
                Hello, my name is Daniel, and I have been diving into web development for the past two years. Over this time, I have gained hands-on experience in creating web applications, and I am constantly striving to improve my skills.
            </p>
            <p>
                Currently, I live in Slovakia, and I'm actively looking for opportunities in the IT field, particularly in front-end development. However, as you'll notice from my website, I also have experience with back-end technologies and database management.
            </p>
            <p>
                This website is a testament to my learning journey. It’s my first project where I combined everything I’ve learned into creating a functional web application. I hope this platform allows me to showcase my growth and skills as I continue on my journey in the tech industry.
            </p>
            <p>
                In my free time, I enjoy working on personal projects, exploring new technologies, and keeping up with the latest trends in front-end development. I’m always open to learning and evolving, and I’m eager to take on new challenges.
            </p>
        </Box>
    );
}

export default AboutMe;
const resources = {
  en: {
    translation: {
      aboutMe: "About Me",
      introduction: "Hello, my name is Daniel, and I have been diving into web development for the past two years...",
      currentlyLooking: "Currently, I live in Slovakia, and I'm actively looking for opportunities in the IT field...",
      projects: "This website is a testament to my learning journey...",
      // přidej další překlady...
    },
  },
  cs: {
    translation: {
      aboutMe: "O mně",
      introduction: "Ahoj, jmenuji se Daniel a poslední dva roky se věnuji webovému vývoji...",
      currentlyLooking: "V současnosti žiji na Slovensku a aktivně hledám příležitosti v oblasti IT...",
      projects: "Tato webová stránka je důkazem mého vývojového procesu...",
      // přidej další překlady...
    },
  },
};
 */
