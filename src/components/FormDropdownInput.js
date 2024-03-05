const FormDropdownInput = () => {
  return (
    <div className="form-dropdown-input">
      <label>Birthdate</label>
      <div className="form-dropdown-container">
        <select>
          <option>Day *</option>
        </select>
        <select>
          <option>Month *</option>
        </select>
        <select>
          <option>Year *</option>
        </select>
      </div>
    </div>
  );
};

export default FormDropdownInput;
