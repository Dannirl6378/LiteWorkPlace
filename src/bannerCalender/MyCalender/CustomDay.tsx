import * as React from 'react';
import { PickersDay } from '@mui/x-date-pickers';
import { Badge, Tooltip, Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import DeleteEvent from './DeleteEvent';

interface CustomDayProps {
  day: Dayjs;
  events: { [key: string]: string[] };
  // Můžete přidat další props podle potřeby
}

const hasEvents = (day: Dayjs, events: { [key: string]: string[] }) => {
  const dateString = day.format('YYYY-MM-DD');
  return events[dateString] && events[dateString].length > 0;
};

const CustomDay: React.FC<CustomDayProps> = ({ day, events, ...props }) => {
  const dateString = day.format('YYYY-MM-DD');
  const dayEvents = events[dateString] || [];

  return (
    <Tooltip
      key={dateString}
      title={
        dayEvents.length > 0 ? (
          <Box>
            {dayEvents.map((event, index) => (
              <Box key={index} display="flex" alignItems="center" justifyContent="space-between">
                <span>{event}</span>
                <DeleteEvent date={dateString} eventText={event} events={events} setEvents={() => {}} />
              </Box>
            ))}
          </Box>
        ) : ''
      }
      arrow
      placement="top"
    >
      <Badge
        overlap="circular"
        badgeContent={hasEvents(day, events) ? '-' : undefined}
        color="primary"
      >
        <PickersDay
          onDaySelect={function (day: dayjs.Dayjs): void {
            throw new Error('Function not implemented.');
          } } outsideCurrentMonth={false} isFirstVisibleCell={false} isLastVisibleCell={false} day={day}
          {...props}
          sx={{
            backgroundColor: hasEvents(day, events) ? 'red' : undefined,
            '&:hover': {
              backgroundColor: hasEvents(day, events) ? 'darkred' : undefined,
            },
          }}        />
      </Badge>
    </Tooltip>
  );
};

export default CustomDay;
