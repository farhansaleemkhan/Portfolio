import React from 'react'

const Form = ({formInput}) => {
  return (
    <div>
      <form className="py-10" onSubmit={handleSubmit}>
        <div className="grid gap-6 m-6 md:grid-cols-2">
          <div>
            {formInput.map((data, index) => (
              <div class="text-left mb-5">
                <label
                  key={index}
                  htmlFor={data.inputType}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {data.inputName}
                </label>
                <input
                  type={data.inputType}
                  id={data.inputID}
                  name={data.inputID}
                  inputmode={data.inputMode}
                  className={`bg-gray-50 appearance-none border mt-5 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors[data.inputID] ? "border-red-500" : ""
                  }`}
                  placeholder={data.inputPlaceholder}
                  pattern={data.inputPattern}
                  value={formData[data.inputID]}
                  onChange={handleInputChange}
                />
                {errors[data.inputID] && (
                  <p className="text-red-500 text-sm">{errors[data.inputID]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default Form;
