import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectOpts extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectOpts> = ({ label, name, options, ...rest }) => {
  return (
    <div className='select-block'>
      <label htmlFor={name}>{label}</label>
      <select value='' className={name} {...rest}>
        <option value='' disabled hidden>Seleccione uma opção</option>

        {options.map(({ value, label }, i) => <option key={i} value={value}>{label}</option>)}
      </select>
    </div>
  );
}

export default Select;
