import React from 'react';

const TextInput = ({ label, placeholder, onChange, value }) => {
  return (
    <div className='field'>
      <label className='label'>{label}</label>
      <div className='control'>
        <input
          className='input'
          type='text'
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextInput;
