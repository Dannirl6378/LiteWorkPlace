import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import News2 from './news2';
import News1 from './news1';

export default function NewsTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab sx={{ fontSize: 15, fontWeight: 'bold'}}  value="one" label="News1" />
        <Tab sx={{ fontSize: 15, fontWeight: 'bold'}} value="two" label="NewsApi" />
        <Tab sx={{ fontSize: 15, fontWeight: 'bold'}}  value="three" label="News3" />
      </Tabs>
      <Box sx={{ mt: 1 }}>
        {value === 'one' && <News1 />} 
        {value === 'two' && <News2 />} 
        </Box>
    </Box>
  );
}