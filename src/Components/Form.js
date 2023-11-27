import React from "react";

const Form = ({ formInput, errors, formData, handleInputChange }) => {
  return (
    <div>
      {formInput.map((data, index) => (
        <div key={index}>
          <label
            htmlFor={data.inputType}
            className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            {data.inputName}
          </label>
          {data.inputID === "message" || data.inputID === "aboutDescription" ? (
            <textarea
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5 ${
                errors[data.inputID] ? "border-red-500" : ""
              }`}
              rows={data.inputRow}
              cols={data.inputColumn}
              type={data.inputType}
              id={data.inputID}
              name={data.inputID}
              placeholder={data.inputPlaceholder}
              pattern={data.inputPattern}
              value={formData[data.inputID]}
              onChange={handleInputChange}
            />
          ) : (
            <input
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5 ${
                errors[data.inputID] ? "border-red-500" : ""
              }`}
              type={data.inputType}
              id={data.inputID}
              name={data.inputID}
              placeholder={data.inputPlaceholder}
              pattern={data.inputPattern}
              value={formData[data.inputID]}
              onChange={handleInputChange}
            />
          )}
          {errors[data.inputID] && (
            <p className="text-red-500 pb-5 text-sm">{errors[data.inputID]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Form;
