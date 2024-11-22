import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import News2 from "./news2";
import "./banner1.css";

export default function NewsTabs() {
  const [value, setValue] = React.useState("two"); // Defaultně nastavujeme na 'two', protože 'one' je zakomentováno

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className="container">
      <Box className="tabs-container">
        <Tabs
          orientation="vertical" // Zůstává vertikální orientace
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          {/* Pokud budete chtít přidat News1, můžete odkomentovat níže */}
          {/* <Tab className="tab" value="one" label="News1" /> */}
          <Tab className="tab" value="two" label="NewsApi" />
          {/* Pokud bude potřeba, přidáte další záložky */}
          {/* <Tab className="tab" value="three" label="News3" /> */}
        </Tabs>
      </Box>

      <Box className="content">
        {/* Zobrazení obsahu podle hodnoty `value` */}
        {value === "two" && (
          <div className="scrolling-cylinder">
          <div className="scrolling-content">
            <News2 />
          </div>
          <div className="scrolling-content">
            <News2 />
          </div>
        </div>
        )}
        {/* Pokud máte další komponenty, odkomentujte a přidejte je */}
        {/* {value === 'three' && <News3 />} */}
      </Box>
    </Box>
  );
}
