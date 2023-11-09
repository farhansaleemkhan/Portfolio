import axios from "axios";
import React, { useState } from "react";
import SuccessAlert from "../../Components/SuccessAlert";
import ErrorAlert from "../../Components/ErrorAlert";

const Contact = () => {
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
      inputID: "name",
      inputName: "Full Name",
      inputType: "text",
      inputPlaceholder: "Enter Full Name",
      inputPattern: /^\S+\ +\S+$/,
    },
    {
      inputID: "email",
      inputName: "Email Address",
      inputType: "email",
      inputPlaceholder: "john.doe@company.com",
      inputPattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
    },
    {
      inputID: "phoneNumber",
      inputName: "Phone Number",
      inputType: "number",
      inputPlaceholder: "03456789012",
      inputPattern: "^03\d{9}$",
      // inputPattern: "^[0-9+]{6}+-[0-9]{7}$",
    },
    {
      inputID: "message",
      inputName: "Message",
      inputType: "text",
      inputPlaceholder: "Write Message you want to send",
      inputPattern: "^[a-zA-Z0-9._%+-]+$",
      inputRow: "5",
      inputColumn: "5",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "message") {
      const skills = value.split(",");
      setFormData({
        ...formData,
        [name]: skills,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

    if (!formData.name) {
      newError.name = "Full Name is required";
    }
    if (!formData.email) {
      newError.email = "Email is required";
    }
    if (!formData.phoneNumber) {
      newError.phoneNumber = "Phone Number is required";
    }
    if (!formData.message) {
      newError.message = "Message is required";
    }

    setErrors(newError);
    return newError;
  };

  const handleSubmit = (e) => {
    console.log(formData);

    e.preventDefault();
    const formError = validateForm();

    if (Object.keys(formError).length === 0) { 
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
      }

      //Backend part
      axios
      .post("", dataToSend)
      .then((messageSend) => {
        console.log("Message Send Successfully", messageSend)
        setSuccessMessage("Congrulation! Your message has been send successfully");
      })
      .catch((error) => {
        console.log("Error occur", error)
        setErrorMessage("Oops! Something went wrong");
      });

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    }
    else{
      setErrorMessage("Please Complete all the fields");
    }
  };

  return (
    <>
      <div className="text-center py-8">
        <a className="text-5xl font-bold uppercase" name="contact">
          Contact Me
        </a>
        <p className="text-2xl font-black py-5">
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
        </p>
        <form className="flex flex-col px-20" onSubmit={handleSubmit}>
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
                {data.inputID === "message" ? 
                <textarea
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5 ${errors[data.inputID] ? "border-red-500" : ""
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
                :
                <input
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5 ${errors[data.inputID] ? "border-red-500" : ""
            }`}
                  type={data.inputType}
                  id={data.inputID}
                  name={data.inputID}
                  placeholder={data.inputPlaceholder}
                  pattern={data.inputPattern}
                  value={formData[data.inputID]}
                  onChange={handleInputChange}
                />
                }
                {errors[data.inputID] && (
                  <p className="text-red-500 pb-5 text-sm">{errors[data.inputID]}</p>
                )}
              </>
            ))}
          </div>
          {successMessage && <SuccessAlert message={successMessage} closeSuccessMessage={closeSuccessMessage} />}
          {errorMessage && <ErrorAlert message={errorMessage} closeErrorMessage={closeErrorMessage} />}
          <button className="text-white bg-cyan-500 hover:bg-cyan-700 text-xl p-3 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </>
  );
};
export default Contact;
