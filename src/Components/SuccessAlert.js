import React from "react";

const SuccessAlert = ({message, closeSuccessMessage}) => {
  return (
    <div
      class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
    >
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">{message}</span>
      </div>
      <button
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
        onClick={closeSuccessMessage}
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
};

export default SuccessAlert;
