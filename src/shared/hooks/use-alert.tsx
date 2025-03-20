import { useState } from 'react';

export const useAlert = () => {
  const [alertValue, setAlertValue] = useState('');
  const [error, setError] = useState('');

  const handleAlertMessage = () => {
    setError('');
    if (alertValue.trim() === '') {
      setError('Введите что-нибудь чтобы увидеть alert');
    } else {
      alert(alertValue);
      setAlertValue('');
    }
  };

  const resetError = () => {
    setError('');
  };

  return {
    alertValue,
    setAlertValue,
    error,
    handleAlertMessage,
    resetError,
  };
};
