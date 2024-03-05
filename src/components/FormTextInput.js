const FormTextInput = (props) => {
  const { label, onChange, ...inputProps } = props;

  return (
    <div className="form-text-input">
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} required />
    </div>
  );
};

export default FormTextInput;
