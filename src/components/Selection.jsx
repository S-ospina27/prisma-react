import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Selection({props,title}) {
  const [selecte, setselecte] = React.useState('');

  const handleChange = (event) => {
    setselecte(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth variant="filled" sx={{  minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selecte}
          label="selecte"
          onChange={handleChange}
        >
            {props.map(opcion =>(
          <MenuItem key={opcion.id}>{opcion.name}</MenuItem>
          ))};
        </Select>
      </FormControl>
    </Box>
  );
}