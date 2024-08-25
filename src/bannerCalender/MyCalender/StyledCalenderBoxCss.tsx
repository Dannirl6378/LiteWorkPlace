import styled from "@emotion/styled";
import { Box } from "@mui/material";

const CBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  overflow: hidden;
  

  & .MuiPickersCalendarHeader-root {
    width: 100%;
    max-width: 90%;
    display: flex;
    justify-content: center;
    height: auto;
    margin: auto;
    margin-top:25%;
  }
    &.css-1t0788u-MuiPickersSlideTransition-root-MuiDayCalendar-slideTransition {
    display:block;
    position:relative;
    overflow-x:hidden;
    min-height:210px;
  }

  & .MuiDayCalendar-weekContainer {
    width: 96%;
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
    align-items: center;
  }

  & .MuiDayCalendar-weekDayLabel {
    font-size: 1.5vw;
    line-height: 1vw;
    text-align: center;
    letter-spacing: 9px;
  }

  @media (min-width: 600px) {
    & .MuiPickersDay-root {
      max-width: 12.5%; /* Slightly larger cells */
    }

    & .MuiDayCalendar-weekDayLabel {
      font-size: 1.2vw;
    }
  }

  @media (min-width: 960px) {
    & .MuiPickersDay-root {
      max-width: 10%;
    }

    & .MuiDayCalendar-weekDayLabel {
      font-size: 1vw;
    }
  }
`;

export default CBox;
