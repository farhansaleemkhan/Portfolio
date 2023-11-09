import axios from "axios";
import React, { useState } from "react";
import SuccessAlert from "../../Components/SuccessAlert";
import ErrorAlert from "../../Components/ErrorAlert";

const ProfileUpdate = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profileData, setProfileData] = useState(null);

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

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
    },
    {
      inputID: "image",
      inputName: "Image URL",
      inputType: "url",
      inputPlaceholder: "http://flowbite.com",
      inputPattern: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
      // inputPattern: /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    },
    {
      inputID: "skills",
      inputName: "Skills",
      inputType: "text",
      inputPlaceholder: "Enter your skills",
      inputPattern: "^[a-zA-Z0-9._%+-]+$",
    },
    {
      inputID: "address",
      inputName: "Address",
      inputType: "text",
      inputPlaceholder: "Enter your Address",
      inputPattern: "^[a-zA-Z0-9._%+-]+$",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    image: "",
    skills: "",
    address: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "skills") {
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
    if (!formData.image) {
      newError.image = "Image is required";
    }
    if (!formData.skills) {
      newError.skills = "Skills are required";
    }
    if (!formData.address) {
      newError.address = "Address is required";
    }

    setErrors(newError);
    return newError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();

    if (Object.keys(errors).length === 0) {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        image: formData.image,
        skills: formData.skills,
        address: formData.address,
      };

      console.log("Data to send: ", dataToSend);

      //Backend part
      axios
        .post("", dataToSend)
        .then((updateProfile) => {
          setSuccessMessage(
            "Congrulation! Your profile has been updated successfully"
          );
          console.log("Profile is updated", updateProfile);
        })
        .catch((error) => {
          setErrorMessage("Oops! Something went wrong");
          console.log("Error occur", error);
        });

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        image: "",
        skills: "",
        address: "",
      });
    } else {
      setErrorMessage("Please complete all the fields");
    }
  };

  return (
    <div className="text-center p-5 md:ml-64">
      <h1 className="text-5xl py-10 font-bold bg-cyan-500 text-white uppercase">
        Profile
      </h1>

      {profileData ? (
        <></>
      ) : (
        <form className="py-10" onSubmit={handleSubmit}>
          <div className="grid gap-6 m-6 md:grid-cols-2">
            <div>
              {formInput.map((data, index) => (
                <div className="text-left mb-5">
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
                    className={`bg-gray-50 appearance-none border mt-5 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors[data.inputID] ? "border-red-500" : ""
                    }`}
                    placeholder={data.inputPlaceholder}
                    pattern={data.inputPattern}
                    value={formData[data.inputID]}
                    onChange={handleInputChange}
                  />
                  {errors[data.inputID] && (
                    <p className="text-red-500 text-sm">
                      {errors[data.inputID]}
                    </p>
                  )}
                </div>
              ))}
            </div>
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
            className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileUpdate;
