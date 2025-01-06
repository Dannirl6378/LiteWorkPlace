import { Box, Button } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";

function Hobbies() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Box sx={{ lineHeight: 1.6, fontSize: "1rem", padding: "16px" }}>
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

export default Hobbies;