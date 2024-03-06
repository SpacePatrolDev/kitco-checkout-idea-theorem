import TextField from "@mui/material/TextField";

const FormTextInput = (props) => {
  const { label, errorMessage, onChange, onBlur, ...inputProps } = props;

  return (
    <div className="form-text-input-container">
      <label className="form-label">{label}</label>
      <TextField
        className="form-text-input"
        label={props.placeholder}
        {...inputProps}
        onChange={onChange}
        onBlur={onBlur}
        error={!!errorMessage}
        required
      />
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};

export default FormTextInput;
