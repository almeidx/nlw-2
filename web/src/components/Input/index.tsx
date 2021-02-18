import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputOpts extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputOpts> = ({ label, name, ...rest }) => {
  return (
    <div className='input-block'>
      <label htmlFor={name}>{label}</label>
      <input type='text' className={name} {...rest} />
    </div>
  );
}

export default Input;
