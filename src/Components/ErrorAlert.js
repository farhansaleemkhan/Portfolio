import React from "react";

const ErrorAlert = ({message, closeErrorMessage}) => {
  return (
    <div
      class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert"
    >
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">{message}</span>
      </div>
      <button
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        onClick={closeErrorMessage}
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
};

export default ErrorAlert;
