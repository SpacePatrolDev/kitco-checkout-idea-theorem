import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const monthMap = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const FormDateSelector = (props) => {
  const { label, onChange, day, month, year } = props;
  const [date, setDate] = useState({ day, month, year });

  const handleDayChange = (e) => {
    setDate({ ...date, day: e.target.value });
    onChange(e);
  };

  const handleMonthChange = (e) => {
    setDate({ ...date, month: e.target.value });
    onChange(e);
  };

  const handleYearChange = (e) => {
    setDate({ ...date, year: e.target.value });
    onChange(e);
  };

  const currentDate = new Date();
  const selectedDate = new Date(date.year, date.month - 1, date.day);

  // Check if date is past date
  const isDateValid = selectedDate < currentDate;

  return (
    <div className="form-dropdown-input">
      <label className="form-label">{label}</label>
      <div className="form-dropdown-container">
        <FormControl className="form-select-container" required>
          <InputLabel id="form-select-day-label">Day</InputLabel>
          <Select
            labelId="form-select-day-label"
            id="form-select-day"
            name="day"
            value={day}
            label="Day"
            onChange={handleDayChange}
            error={!isDateValid}
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="form-select-container" required>
          <InputLabel id="form-select-month-label">Month</InputLabel>
          <Select
            labelId="form-select-month-label"
            id="form-select-month"
            name="month"
            value={month}
            label="Month"
            onChange={handleMonthChange}
            error={!isDateValid}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <MenuItem key={month} value={month}>
                {monthMap[month]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="form-select-container" required>
          <InputLabel id="form-select-month-label">Year</InputLabel>
          <Select
            labelId="form-select-year-label"
            id="form-select-year"
            name="year"
            value={year}
            label="Year"
            onChange={handleYearChange}
            error={!isDateValid}
          >
            {Array.from(
              { length: 100 },
              (_, i) => currentDate.getFullYear() - i
            ).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FormDateSelector;
