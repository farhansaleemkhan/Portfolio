import React, { useEffect } from "react";

const Alert = ({type, message, closeAlert}) => {

  let alertClass = "";
  let buttonClass = "";

  if(type === "success"){
    alertClass = "text-green-800 border border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800";
    buttonClass = "bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700";
  }
  else if(type === "error"){
    alertClass = " bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 border-red-300 text-red-800";
    buttonClass = "bg-red-50 text-red-500 focus:ring-2 focus:ring-red-400 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
    }, 3000);

    return () => clearTimeout(timer);
  }, [closeAlert]);
  
  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm border  rounded-lg ${alertClass}`}
      role="alert"
    >
      {/* <span className="sr-only">Info</span> */}
      <div>
        <span className="font-medium">{message}</span>
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${buttonClass}`}
        onClick={closeAlert}
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
};

export default Alert;
