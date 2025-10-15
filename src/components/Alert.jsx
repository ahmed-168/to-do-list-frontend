import React from 'react'

const Alert = ({ type = "info", message }) => {
  if (!message) return null;

  // Pick style based on type
  const baseClass =
    "p-2 mb-2 rounded text-sm border flex items-center gap-2";
  const styles = {
    info: `${baseClass} bg-blue-100 text-blue-700 border-blue-300`,
    success: `${baseClass} bg-green-100 text-green-700 border-green-300`,
    error: `${baseClass} bg-red-100 text-red-700 border-red-300`,
    warning: `${baseClass} bg-yellow-100 text-yellow-700 border-yellow-300`,
  };

  return <div className={styles[type]}>{message}</div>;
};

export default Alert;