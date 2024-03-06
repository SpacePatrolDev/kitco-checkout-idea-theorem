import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FormDateSelector = (props) => {
  const { day, month, year, onChange } = props;

  const handleDayChange = (event) => {
    onChange({ target: { name: "day", value: event.target.value } });
  };

  const handleMonthChange = (event) => {
    onChange({ target: { name: "month", value: event.target.value } });
  };

  const handleYearChange = (event) => {
    onChange({ target: { name: "year", value: event.target.value } });
  };

  return (
    <div className="form-dropdown-input">
      <label className="form-label">{props.label}</label>
      <div className="form-dropdown-container">
        <FormControl className="form-select-container" required>
          <InputLabel id="form-select-day-label">Day</InputLabel>
          <Select
            labelId="form-select-day-label"
            id="form-select-day"
            value={day}
            label="Day"
            onChange={handleDayChange}
          >
            <MenuItem value="01">01</MenuItem>
            <MenuItem value="02">02</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="form-select-container" required>
          <InputLabel id="form-select-month-label">Month</InputLabel>
          <Select
            labelId="form-select-month-label"
            id="form-select-month"
            value={month}
            label="Month"
            onChange={handleMonthChange}
          >
            <MenuItem value="Jan">Jan</MenuItem>
            <MenuItem value="Feb">Feb</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="form-select-container" required>
          <InputLabel id="form-select-month-label">Year</InputLabel>
          <Select
            labelId="form-select-year-label"
            id="form-select-year"
            value={year}
            label="Year"
            onChange={handleYearChange}
          >
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FormDateSelector;
