import axios from "axios";
import React, { useState } from "react";
import Alert from "../../Components/Alert";
import Form from "../../Components/Form";

const Contact = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = "65647756b1e006a5838a1952";

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
      inputType: "tel",
      inputPlaceholder: "+92 345-6789012",
      // inputPattern: "^03d{9}$",
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

    // if (name === "message") {
    //   const skills = value.split(",");
    //   setFormData({
    //     ...formData,
    //     [name]: skills,
    //   });
    // } else {
    //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   });
    // }

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
        userId: userId,
      };

      //Backend part
      axios
        .post("http://localhost:3000/contact/new", dataToSend)
        .then((messageSend) => {
          console.log("Message Send Successfully", messageSend);
          setSuccessMessage(
            "Congrulation! Your message has been send successfully"
          );
        })
        .catch((error) => {
          console.log("Error occur", error);
          setErrorMessage("Oops! Something went wrong");
        });

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } else {
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
          <Form
            formInput={formInput}
            errors={errors}
            formData={formData}
            handleInputChange={handleInputChange}
          />
          {successMessage && (
            <Alert
              type="success"
              message={successMessage}
              closeAlert={closeSuccessMessage}
            />
          )}
          {errorMessage && (
            <Alert
              type="error"
              message={errorMessage}
              closeAlert={closeErrorMessage}
            />
          )}
          <button className="text-white bg-cyan-500 hover:bg-cyan-700 text-xl p-3 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </>
  );
};
export default Contact;