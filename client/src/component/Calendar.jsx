import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import service from '../services/holidays';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';
import Description from './Description';
import Select from 'react-select';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const Calendar = () => {
  const julianGapDays = 13
  const [value, setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);
  const [commemoration, setcommemoration] = useState(null)
  const [selectedOption, setSelectedOption] = React.useState(null);

  // Updates commemoration whenever a different date or church is selected
  useEffect(() => {
    const newDate = new Date(value);
    newDate.setDate(newDate.getDate() - 13);
    console.log(newDate.toString());
    let day = newDate.getDate().toString()
    if(day.length < 2) {
      day = day.padStart(2, '0')
    }
    let month = (newDate.getMonth() + 1).toString()
    if(month.length < 2) {
      month = month.padStart(2, '0')
    }
    console.log(commemoration);
    const promise = selectedOption == options[0] ? service.getGoc(day, month)
      : service.getCath(day, month)

    promise.then(ret=>{
      console.log(ret);
      if(selectedOption==options[0]) {
        setcommemoration(ret)
      } else {
        setcommemoration(ret.celebrations[0].title)
      }
    })
  }, [value, selectedOption]);


  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };


  const shouldDisableDate = (date) => {
    // Disable dates from Jan 1 to Jan 13
    const isDisabled = date.getMonth() === 0 && date.getDate() >= 1 && date.getDate() <= 13;

    // Disable years other than the current year
    const isYearDisabled = date.getFullYear() !== value.getFullYear();

    return isDisabled || isYearDisabled;
  };

  const optionsDivStyle = {
    flexDirection: 'column'
  }

  return (
    <div>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        // mask='____/__/__'
        variant='static'
        orientation='portrait'
        value={value}
        shouldDisableDate={shouldDisableDate}
        // disableFuture
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => {
          <TextField {...params} />;
        }}

      />
    </LocalizationProvider>
    <div>

    {value.toString()}
    </div>
    {
      selectedOption == options[0] ?
      <div dangerouslySetInnerHTML={{ __html: commemoration }} />
      :
      <div>
        {commemoration}
      </div>
    }
    <div className="dropdown-container">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Select an option"
        className="custom-dropdown"
      />
    </div>
    </div>
  );
    // <div style={optionsDivStyle}>
    //   <label>
    //     <input
    //       type="radio"
    //       value="option1"
    //       checked={selectedOption === 'option1'}
    //       onChange={handleOptionChange}
    //     />
    //     Option 1
    //   </label>
    //   <label>
    //     <input
    //       type="radio"
    //       value="option2"
    //       checked={selectedOption === 'option2'}
    //       onChange={handleOptionChange}
    //     />
    //     Option 2
    //   </label>
    //   <label>
    //     <input
    //       type="radio"
    //       value="option3"
    //       checked={selectedOption === 'option3'}
    //       onChange={handleOptionChange}
    //     />
    //     Option 3
    //   </label>
    //   <p>Selected Option: {selectedOption}</p>
    // </div>
};

export default Calendar;
