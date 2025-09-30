import React from 'react';
import Select from 'react-select';

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = 'اختر عنصرًا',
  isMulti = false,
  isDisabled = false,
  name,
  className = '',
  styles = {},
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isMulti={isMulti}
      isDisabled={isDisabled}
      name={name}
      className={className}
      styles={styles}
    />
  );
};

export default CustomSelect;
