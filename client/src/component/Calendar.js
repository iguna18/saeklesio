import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';
import service from '../services/holidays';
import Description from './Description';

const Calendar = () => {
  const julianGapDays = 13
  const [value, setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);
  const [commemorationText, setcommemorationText] = useState('')
  const [selectedOption, setSelectedOption] = useState('option1');

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
    const promise = selectedOption == 'option1' ? service.getOrtho(day, month)
      : service.getCath(day, month)

    promise.then(html=>{
      console.log(html);
      setcommemorationText(html)
    })
  }, [value, selectedOption]);



  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  return (
    <div>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        // mask='____/__/__'
        variant='static'
        orientation='portrait'
        value={value}
        // disableFuture
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => {
          <TextField {...params} />;
        }}
        // renderDay={(day, _value, DayComponentProps) => {
        //   const isSelected =
        //     !DayComponentProps.outsideCurrentMonth &&
        //     highlightedDays.indexOf(day.getDate()) >= 0;

        //   return (
        //     <Badge
        //       key={day.toString()}
        //       overlap='circular'
        //       badgeContent={isSelected ? <CheckIcon color='red' /> : undefined}
        //     >
        //       <PickersDay {...DayComponentProps} />
        //     </Badge>
        //   );
        // }}
      />
    </LocalizationProvider>
    <div>

    {value.toString()}
    </div>
    {/* <div dangerouslySetInnerHTML={{ __html: commemorationText }} /> */}
    {/* <Description text={commemorationText}/> */}
    <div>{commemorationText}</div>
    <div>
      <label>
        <input
          type="radio"
          value="option1"
          checked={selectedOption === 'option1'}
          onChange={handleOptionChange}
        />
        Option 1
      </label>
      <label>
        <input
          type="radio"
          value="option2"
          checked={selectedOption === 'option2'}
          onChange={handleOptionChange}
        />
        Option 2
      </label>
      <p>Selected Option: {selectedOption}</p>
    </div>
    </div>
  );
};

export default Calendar;
