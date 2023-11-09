import React, { useState } from "react";
import axios from "axios";
import SuccessAlert from "../../Components/SuccessAlert";
import ErrorAlert from "../../Components/ErrorAlert";

const AboutChange = () => {
  const [errors, setErrors] = useState({});
  
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  const formInput = [
    {
      inputID: "description",
      inputName: "About Yourself",
      inputType: "text",
      inputPlaceholder: "Write about yourself",
      inputPattern: "^[a-zA-Z0-9._%+-]+$",
      inputRow: "5",
      inputColumn: "5",
    },
    {
      inputID: "resume",
      inputName: "Resume Link",
      inputType: "url",
      inputPlaceholder: "http://flowbite.com",
      inputPattern: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
      // inputPattern: /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    },
  ];

  const [formData, setFormData] = useState({
    description: "",
    resume: "",
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

    // formInput.forEach((input) => {
    //   if (!formData[input.inputID]) {
    //     newError[input.inputID] = `${input.inputName} is required`;
    //   }
    //   else if (input.inputPattern && !input.inputPattern.test(formData[input.inputID])) {
    //     newError[input.inputID] = `Invalid ${input.inputName}`;
    //   }
    // });

    if (!formData.description) {
      newError.description = "Description is required";
    }
    if (!formData.resume) {
      newError.resume = "Resume Link is required";
    }

    setErrors(newError);
    return newError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formError = validateForm();

    if (Object.keys(formError).length === 0) {
      const dataToSend = {
        description: formData.description,
        resume: formData.resume,
      };
      console.log("about change ===", dataToSend);

      //For storing data in backend
      axios
        .post("api", dataToSend)
        .then((createAbout) => {
          setSuccessMessage(
            "Congrulation! Your data has been updated successfully"
          );
          console.log("About is created", createAbout);
        })
        .catch((error) => {
          setErrorMessage("Oops! Something went wrong");
          console.log("Error occur", error);
        });

      setFormData({
        description: "",
        resume: "",
      });
    } else {
      setErrorMessage("Oops! Something went wrong");
    }
  };

  return (
    <div className="p-5 md:ml-64">
      <h1 className="text-4xl py-8 font-bold bg-cyan-500 text-center text-white uppercase">
        About
      </h1>
      <form className="py-10" onSubmit={handleSubmit}>
        <div>
          {formInput.map((data, index) => (
            <>
              <label
                key={index}
                htmlFor={data.inputType}
                className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
              >
                {data.inputName}
              </label>
              {data.inputID === "description" ? (
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
                <p className="text-red-500 pb-5 text-sm">
                  {errors[data.inputID]}
                </p>
              )}
            </>
          ))}
        </div>
        {successMessage && (
          <SuccessAlert
            message={successMessage}
            closeSuccessMessage={closeSuccessMessage}
          />
        )}
        {errorMessage && (
          <ErrorAlert
            message={errorMessage}
            closeErrorMessage={closeErrorMessage}
          />
        )}
        <button
          type="submit"
          className="text-white my-5 bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AboutChange;
