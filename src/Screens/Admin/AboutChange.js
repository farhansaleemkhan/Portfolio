import React, { useState } from "react";
import axios from "axios";
import SuccessAlert from "../../Components/SuccessAlert";
import ErrorAlert from "../../Components/ErrorAlert";

const AboutChange = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [aboutData , setAboutData] = useState({})
  const [editAbout, setEditAbout] = useState(null);
  const [isUpdateAbout, setIsUpdateAbout] = useState(false);

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  const aboutData = {
    aboutDescription:
      "Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization. You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!",
    resumeURL: "",
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
    {
      inputID: "userId",
      inputName: "User ID",
      inputType: "text",
      inputPlaceholder: "Enter User ID",
      inputPattern: "^[a-zA-Z0-9._%+-]+$",
    },
  ];

  const [formData, setFormData] = useState({
    description: "",
    resume: "",
    userId: "",
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
    if (!formData.userId) {
      newError.userId = "User Id is required";
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
        userId: formData.userId,
      };
      console.log("about change ===", dataToSend);

      //For storing data in backend
      axios
        .post("api", dataToSend)
        .then((createAbout) => {
          setSuccessMessage(
            "Congrulation! Your data has been saved successfully"
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
        userId: "",
      });
    } else {
      setErrorMessage("Please complete all input fields");
    }
  };

  //To get about data from Backend
  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:3000/abouts")
  //     .then((response) => {
  //      const userData = response.data;
  //      const recieveData = userData.about;
  //       setAboutText({
  //         aboutDescription : recieveData.description,
  //         resumeURL : recieveData.resume
  //       });
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleEditClick = (about) => {
    setEditAbout(about);
    setFormData({
      description: about.aboutDescription,
      resume: about.resumeURL,
      userId: about._id,
    });
    setIsUpdateAbout(true);
  };

  //Delete About section
  const handleDeleteClick = (about) => {
    const aboutDeleteId = about.userId;
    axios
    .delete(`http://localhost:3000/about/${aboutDeleteId}`)
    .then((updateAbout) => {
      setSuccessMessage(
        "Congrulation! Selected item has been deleted successfully"
      );
      console.log("About is deleted", updateAbout);
    })
    .catch((error) => {
      setErrorMessage("Oops! Something went wrong");
      console.log("Error occur", error);
    });
  }



  return (
    <div className="p-5 md:ml-64">
      <h1 className="text-4xl py-8 font-bold bg-cyan-500 text-center text-white uppercase">
        About
      </h1>
      {(Object.keys(aboutData).length === 0 || isUpdateAbout) && (
        <form className="py-10" onSubmit={handleSubmit}>
          <div>
            {formInput.map((data, index) => (
              <div key={index}>
                <label
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
              </div>
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
      )}
      {(!isUpdateAbout && Object.keys(aboutData).length !== 0 ) && (
        <div className="bg-cyan-500 text-center py-10">
          <div className="text-white flex flex-row px-80 py-5">
            <p className="text-left">{aboutData.aboutDescription}</p>
          </div>
          <button
            className="text-white outline outline-white rounded-full hover:bg-white hover:text-black text-lg p-2"
            type="button"
          >
            <i className="fa fa-download"></i>Download Resume!
            {aboutData.resumeURL}
          </button>
          <br />
          <br />
          <button
            className="text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleEditClick(aboutData)}
          >
            Edit <i className="fa-solid fa-pencil" />
          </button>
          <button
            className="text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleDeleteClick(aboutData)}
          >
            Delete <i className="fa-solid fa-trash" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AboutChange;
