import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import 'dayjs/locale/cs';


dayjs.extend(localizedFormat);
dayjs.locale('cs'); 

export default function MyCalender() {
    const [value, setValue] = useState<Dayjs | null>(dayjs('2024-07-24'));//toLocatedateString
  return (    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DateCalendar', 'DateCalendar']}>
      <DemoItem label="Uncontrolled calendar">
        <DateCalendar defaultValue={dayjs('2022-04-17')} />
      </DemoItem>
      <DemoItem label="Controlled calendar">
        <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
      </DemoItem>
    </DemoContainer>
  </LocalizationProvider>
);
);
}

