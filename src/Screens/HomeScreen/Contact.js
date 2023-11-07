import React, { useState } from "react";

const Contact = () => {
  const [errors, setErrors] = useState({});
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
      inputPlaceholder: "+92-3456789012",
      inputPattern: "^[0-9+]{3}+-[0-9]{10}$",
      inputMode: "none",
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
      newError.address = "Message is required";
    }

    setErrors(newError);
    return newError;
  };

  const handleSubmit = (e) => {
    console.log(formData);

    e.preventDefault();
    validateForm();
    if (Object.keys(errors).length === 0) {
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
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
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {data.inputName}
                </label>
                <input
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5 errors[data.inputID] ? "border-red-500" : ""
            }`}
                  type={data.inputType}
                  id={data.inputID}
                  name={data.inputID}
                  placeholder={data.inputPlaceholder}
                  pattern={data.inputPattern}
                  value={formData[data.inputID]}
                  onChange={handleInputChange}
                />
                {errors[data.inputID] && (
                  <p className="text-red-500 text-sm">{errors[data.inputID]}</p>
                )}
              </>
            ))}
          </div>

          {/* <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5"
              rows="5"
              cols="5"
              type="text"
              id="message"
              placeholder="Write Message"
              required
            /> */}
          {/* </div> */}
          <button className="text-white bg-cyan-500 hover:bg-cyan-700 text-xl p-3 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </>
  );
};
export default Contact;
