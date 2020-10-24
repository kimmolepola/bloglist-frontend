import { useState } from 'react';

/* eslint-disable import/prefer-default-export */
export const useField = (type, name, datacy) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    datacy,
    type,
    value,
    onChange,
    reset,
    name,
  };

/* eslint-enable import/prefer-default-export */
};
