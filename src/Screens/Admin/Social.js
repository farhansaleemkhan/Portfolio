import axios from 'axios';
import React, { useState } from 'react';
import SuccessAlert from '../../Components/SuccessAlert';
import ErrorAlert from '../../Components/ErrorAlert';

const Social = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const closeSuccessMessage = () => {
    setSuccessMessage("");
  }
  const closeErrorMessage = () => {
    setErrorMessage("");
  }

  const formInput = [
    {
      inputID: "title",
      inputName: "Social App Name",
      inputType: "text",
      inputPlaceholder: "Enter Social App Name",
      inputPattern: /^\S+\ +\S+$/,
    },
    {
      inputID: "link",
      inputName: "Account URL",
      inputType: "url",
      inputPlaceholder: "http://flowbite.com",
      inputPattern: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
      // inputPattern: /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    },
    {
      inputID: "iconLink",
      inputName: "Icon Class",
      inputType: "text",
      inputPlaceholder: "Write icon class e.g. fa fa-instagram",
      inputPattern: /^\S+\ +\S+$/,
    },
  ];

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    iconLink: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newError = {};

    formInput.forEach((input) => {
      if (!formData[input.inputID]) {
        newError[input.inputID] = `${input.inputName} is required`;
      }
      // else if (input.inputPattern && !input.inputPattern.test(formData[input.inputID])) {
      //   newError[input.inputID] = `Invalid ${input.inputName}`;
      // }
    });

    setErrors(newError);
    return newError;
  };

  const handleSubmit = (e) => {

    console.log("=======formData===",formData)

    e.preventDefault();
    validateForm();
    if (Object.keys(errors).length === 0) {

      const dataToSend = {
        title: formData.title,
        link: formData.link,
        iconLink: formData.iconLink,
      }

      console.log("Data to send: ",dataToSend);

      //Backend part
      axios
      .post("", dataToSend)
      .then((updateSocial) => {
        setSuccessMessage(
          "Congrulation! Your data has been updated successfully"
        );
        console.log("Social Fields are updated", updateSocial)
      })
      .catch((error) => {
        console.log("Error occur", error)
        setErrorMessage("Oops! Something went wrong");
      });

      setFormData({
        title: "",
        link: "",
        iconLink: "",
      });
    }
    else{
      setErrorMessage("Please complete all fields");
    }
  };

  return (
    <div className="text-center p-5 md:ml-64">
      <h1 className="text-4xl py-8 font-bold bg-cyan-500 text-center text-white uppercase">
        Social Links
      </h1>

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
        {successMessage && <SuccessAlert message={successMessage} closeSuccessMessage={closeSuccessMessage} />}
        {errorMessage && <ErrorAlert message={errorMessage} closeErrorMessage={closeErrorMessage} />}
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

export default Social;
