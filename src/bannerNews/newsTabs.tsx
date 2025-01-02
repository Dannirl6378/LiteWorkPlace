import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import News2 from "./news2"; // Import komponenty News2
import "./banner1.css"; // Styl

export default function NewsTabs() {
  const [value, setValue] = React.useState("two"); // Výchozí hodnota záložky

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className="container">
      <Box className="tabs-container">
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          textColor="secondary"
          centered={true}
          sx={{ display: { xs: "none", sm: "flex" } }} // Skrytí vertikálních záložek na mobilech
        >
          <Tab id="tab" value="two" label="Bullet News" sx={{
      height: "auto", // Umožní přizpůsobení výšky podle obsahu
    }}/>
        </Tabs>
        {/* Na mobilu budou záložky horizontální */}
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{ height:"auto",display: { xs: "flex", sm: "none" }, flexDirection: "row", justifyContent: "space-evenly" }} 
        
        >
          <Tab id="tab" value="two" label="Bullet News" />
        </Tabs>
      </Box>
      <Box className="content">{value === "two" && <News2 />}</Box>
    </Box>
  );
}
