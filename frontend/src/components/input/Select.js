import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ id, label, isMultiSelect, data, selectedValues, onChange }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? 'white' : 'black',
      backgroundColor: state.isFocused ? 'black' : 'white',
    }),
  };

  return (
    <div>
      {isMultiSelect ? (
        <>
          <label>{label}</label>
          <Select
            className="dropdown"
            styles={customStyles}
            placeholder="Select Options"
            value={data.filter(obj => selectedValues.includes(obj.value))}
            options={data}
            onChange={onChange} 
            isMulti
            isClearable
            name={id}
          />
        </>
      ) : (
        <>
          <label>{label}</label>
          <Select
            className='dropdown text-dark'
            styles={customStyles}
            value={selectedValues}
            options={data}
            onChange={onChange} 
            isSearchable
            name={id}
            placeholder="Select Options"
          />
        </>
      )}
    </div>
  );
}

  export default CustomSelect;
