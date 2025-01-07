import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";

function Hobbies() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang); // Změna jazyka
  };

  return (
    <Box
    sx={{ lineHeight: 1.6, fontSize: "1rem", padding: "16px" }}
    >
      {/* Nadpis */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        {t("Hobbies")} {/* Překlad nadpisu */}
      </Typography>

      {/* Popis koníčků */}
      <Typography
        variant="body1"
        sx={{
          color: "text.primary",
          textAlign: "justify",
        }}
      >
        {t(
          "interests"
        )} {/* Překlad textu popisu */}
      </Typography>

      {/* Přepínání jazyků */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => changeLanguage("cs")}
          sx={{ marginRight: "8px" }}
        >
          Čeština
        </Button>
        <Button variant="outlined" onClick={() => changeLanguage("en")}>
          English
        </Button>
      </Box>
    </Box>
  );
}

export default Hobbies;
