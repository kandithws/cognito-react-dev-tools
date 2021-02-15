import React from 'react';

const DropDownList = ({ label, options, onChange, value }) => {
  return (
    <div className='field'>
      <label className='label'>{label}</label>
      <div className='select'>
        <select onChange={onChange} value={value}>
          {options.map((v) => {
            if (Array.isArray(v) && v.length === 2)
              return (
                <option key={v[0]} value={v[0]}>
                  {v[1]}
                </option>
              );

            return (
              <option key={v} value={v}>
                {v}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

DropDownList.defaultValues = {
  options: [],
};

export default DropDownList;
