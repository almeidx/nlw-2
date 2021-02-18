import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaOpts extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const Textarea: React.FC<TextareaOpts> = ({ label, name, ...rest }) => {
  return (
    <div className='textarea-block'>
      <label htmlFor={name}>{label}</label>
      <textarea className={name} {...rest} />
    </div>
  );
}

export default Textarea;
