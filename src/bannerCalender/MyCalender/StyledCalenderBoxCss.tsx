import styled from "@emotion/styled";
import { Box } from "@mui/material";

const CBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  overflow: hidden;
  

  & .MuiPickersCalendarHeader-root {
    width: 100%;
    max-width: 90%;
    display: flex;
    justify-content: center;
    height: auto;
    margin: auto;
  }
    &.css-1t0788u-MuiPickersSlideTransition-root-MuiDayCalendar-slideTransition {
    display:block;
    position:relative;
    overflow-x:hidden;
    min-height:210px;
  }

  & .MuiDayCalendar-weekContainer {
    width: 97%;
    display: flex;
    justify-content: space-between; /* Ensure days are evenly distributed */
  }

  & .MuiPickersDay-root {
    flex: 1;
    aspect-ratio: 1; /* Maintains square shape */
    max-width: 14.2857%; /* Ensures 7 days per row */
    box-sizing: border-box; /* Prevents padding from affecting size */
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top:3px;
  }

  & .MuiDayCalendar-weekDayLabel {
    line-height: 1vw;
    text-align: center;
    letter-spacing: 9px;
  }
    & .MuiAccordionDetails-root {
    padding: 8px 16px 16px;
    height:30vh;
  }
    

  @media (min-width: 600px) 
  height: 15vh;
    & .MuiPickersDay-root {
      max-width: 12.5%; /* Slightly larger cells */
    }
      & .MuiAccordionDetails-root {
    padding: 8px 16px 16px;
  }

    .MuiPickersCalendarHeader-root {
    letter-spacing: 2px !important;
    letter-spacing: 9px;
    height:20vh;
    font-size:1.5vw;
    }
    & .MuiDayCalendar-weekDayLabel {
    letter-spacing: 2px !important;
   
    line-height: 1vw;
    text-align: center;
  }
    & .MuiDayCalendar-weekContainer {
    height:4vh;}

  }

  @media (min-width: 960px) {
    & .MuiPickersDay-root {
      max-width: 10%;
    }

   
      @media (max-width: 200px) {
    width: 50%; /* Plná šířka na mobilu */
    height: 40vh; /* Zvýšená výška pro lepší čitelnost */

    & .MuiPickersDay-root {
      max-width: 100%; /* Zajistit čtvercový formát na mobilu */
    }
      & .MuiDayCalendar-weekDayLabel {
  width:100%;
    font-size: 1.3vw;
    }

    & .MuiDayCalendar-weekContainer {
      width: 100%; /* Plná šířka */
    }
      
  }
`;

export default CBox;
