import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";

export const useEventChecker = (events: { [key: string]: string[] }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const checkEvent = () => {
      const now = dayjs();
      Object.entries(events).forEach(([date, texts]) => {
        if (dayjs(date).isSame(now, "day")) {
          texts.forEach((text) => {
            enqueueSnackbar(`Event today: ${text}`, { variant: "info" });
          });
        }
      });
    };
    const intervalId = setInterval(checkEvent, 60000);
    return () => clearInterval(intervalId);
  }, [events, enqueueSnackbar]);
};
