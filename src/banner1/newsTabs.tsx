import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import News2 from './news2';
import News1 from './news1';
import './banner1.css';

export default function NewsTabs() {
  const [value, setValue] = React.useState('one');

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
          indicatorColor="secondary"
        >
          <Tab className="tab" value="one" label="News1" />
          <Tab className="tab" value="two" label="NewsApi" />
          <Tab className="tab" value="three" label="News3" />
        </Tabs>
      </Box>
      <Box className="content">
        {value === 'one' && <News1 />}
        {value === 'two' && <News2 />}
        {/* Add the component for 'three' if it exists */}
      </Box>
    </Box>
  );
}
