import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

const ChuckNorrisJoke = () => {
  const [joke, setJoke] = useState("");

  const getChuckNorrisJoke = async () => {
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getChuckNorrisJoke();
    const intervall = setInterval(getChuckNorrisJoke, 120000);
    return () => clearInterval(intervall);
  }, []);
  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      marginTop:"-2%",
      gap:"5%",
    }}>
      <h4 style={{ marginTop: "2%",marginBottom:"1%" }}>Chuck Norris Joke</h4>
      <p>{joke}</p>
    </Box>
  );
};
export default ChuckNorrisJoke;
