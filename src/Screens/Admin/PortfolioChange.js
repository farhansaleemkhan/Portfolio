import React, { useState, useEffect } from "react";
import SuccessAlert from "../../Components/SuccessAlert";
import ErrorAlert from "../../Components/ErrorAlert";
import axios from "axios";

const PortfolioChange = () => {
  // const [portfolioData, setPortfolioData] = useState([]);
  const [isNewProject, setIsNewProject] = useState(false);
  const [isUpdateProject, setIsUpdateProject] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editProjectIndex, setEditProjectIndex] = useState(null);

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  const portfolioData = [
    {
      projectName: "Cabin",
      projectImage:
        "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/cabin.png",
      projectDescription: "",
      projectStartDate: "",
      projectEndDate: "",
      projectLanguage: "",
    },
    {
      projectName: "Cake",
      projectImage:
        "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/cake.png",
      projectDescription: "",
      projectStartDate: "",
      projectEndDate: "",
      projectLanguage: "",
    },
    {
      projectName: "Circus",
      projectImage:
        "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/circus.png",
      projectDescription: "",
      projectStartDate: "",
      projectEndDate: "",
      projectLanguage: "",
    },
  ];

  const formInput = [
    {
      inputID: "name",
      inputName: "Project Name",
      inputType: "text",
      inputPlaceholder: "Enter Project Name",
      inputPattern: /^\S+\ +\S+$/,
    },
    {
      inputID: "image",
      inputName: "Project Image URL",
      inputType: "url",
      inputPlaceholder: "http://flowbite.com",
      inputPattern: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
      // inputPattern: /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    },
    {
      inputID: "description",
      inputName: "Project Description",
      inputType: "text",
      inputPlaceholder: "Enter your project description",
      inputPattern: /^\S+\ +\S+$/,
    },
    {
      inputID: "startDate",
      inputName: "Start Date",
      inputType: "date",
    },
    {
      inputID: "endDate",
      inputName: "End Date",
      inputType: "date",
    },
    {
      inputID: "language",
      inputName: "Language",
      inputType: "text",
      inputPlaceholder:
        "Enter technology / languages used for project e.g. react etc.",
      inputPattern: "^[a-zA-Z0-9._%+-]+$",
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
    name: "",
    image: "",
    description: "",
    startDate: "",
    endDate: "",
    language: "",
    userId: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    setErrorMessage("");
    if (name === "language") {
      const languages = value.split(",");
      setFormData({
        ...formData,
        [name]: languages,
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
    console.log("=======formData===", formData);

    e.preventDefault();
    const formError = validateForm();

    if (Object.keys(formError).length === 0) {
      const dataToSend = {
        name: formData.name,
        image: formData.image,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        language: formData.language,
        userId: formData.userId,
      }
      if (isNewProject && editProjectIndex !== null) {
        axios
          .put(`http://localhost:3000/project/${formData.userId}`, formData)
          .then((response) => {
            setSuccessMessage("Congratulations! Your project has been updated successfully");
            console.log("Project is updated", response.data);
          })
          .catch((error) => {
            setErrorMessage("Oops! Something went wrong");
            console.log("Error occurred", error);
          });
        setEditProjectIndex(null);
      } else {
        axios
        .post("http://localhost:3000/project/new", dataToSend)
        .then((updateProfile) => {
          setSuccessMessage("Congrulation! Your data has been saved successfully")
          console.log("Profile is updated", updateProfile)
        })
        .catch((error) => {
          setErrorMessage("Oop! Something went wrong")
          console.log("Error occur", error)
        });
      }
      setFormData({
        name: "",
        image: "",
        description: "",
        startDate: "",
        endDate: "",
        language: "",
        userId: "",
      });
    } else {
      setErrorMessage("Please complete all input fields");
    }
  };

  const handleEditClick = (index) => {
    const projectToEdit = portfolioData[index];
    setFormData({
      name: projectToEdit.projectName,
      image: projectToEdit.projectImage,
      description: projectToEdit.projectDescription,
      startDate: projectToEdit.projectStartDate,
      endDate: projectToEdit.projectEndDate,
      language: projectToEdit.projectLanguage,
      userId: projectToEdit.projecId,
    });

    setIsNewProject(true);
    setIsUpdateProject(false);
    setEditProjectIndex(index);
    setIsVisible(false);
  };

  //Delete Project from list
  const handleDeleteClick = (index) => {
    const projectToDelete = portfolioData[index];
    const deleteProjectId = projectToDelete.projectId;
    axios
    .delete(`http://localhost:3000/project/${deleteProjectId}`)
    .then((response) => {
      setSuccessMessage("Congratulations! Selected project has been deleted successfully");
      console.log("Project is deleted", response.data);
    })
    .catch((error) => {
      setErrorMessage("Oops! Something went wrong");
      console.log("Error occurred", error);
    });
  }

  return (
    <div className="p-5 md:ml-64">
      <h1 className="text-4xl py-8 font-bold bg-cyan-500 text-center text-white uppercase">
        Project
      </h1>

      {portfolioData.length !== 0 && isVisible && (
        <div className="border border-black p-5">
          <div className="bg-slate-700 text-white p-3">
            <label htmlFor="projectSelect" className="block font-bold text-lg">
              Select an option
            </label>
          </div>
          <br />
          <button
            type="submit"
            className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setIsNewProject(true);
              setIsUpdateProject(false);
              setIsVisible(false);
            }}
          >
            Add new Project Detail
          </button>
          <br />
          <br />
          <button
            type="submit"
            className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setIsUpdateProject(true);
              setIsNewProject(false);
              setIsVisible(false);
            }}
          >
            Change Existing Projects Detail
          </button>
        </div>
      )}

      {(isNewProject || portfolioData.length === 0) && (
        <form className="py-10 border border-black" onSubmit={handleSubmit}>
          <div className="grid gap-6 m-6 md:grid-cols-2">
            <div>
              {formInput.map((data, index) => (
                <div className="text-left mb-5" key={index}>
                  <label
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
            className="text-white ml-5 bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      )}
      {isUpdateProject && portfolioData.length !== 0 && (
        <div className="grid grid-cols-3 grid-rows-2 my-10 gap-24">
          {portfolioData.map((data, index) => (
            <div className="items-center h-48 w-64 my-10 rounded" key={index}>
              <div className="align-center justify-center">
                <img
                  className="h-48 w-64 rounded"
                  src={data.projectImage}
                  alt={data.projectName}
                />
              </div>
              <div className="bg-slate-700 pl-1 rounded text-white py-5">
                <p className="font-semibold">
                  Project Name: {data.projectName}
                </p>
                <p className="">
                  Project Description: {data.projectDescription}
                </p>
                <p className="">Start Date: {data.projectStartDate}</p>
                <p className="">End Date: {data.projectEndDate}</p>
                <p className="">Technology: {data.projectLanguage}</p>
                <button
                  className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleEditClick(index)}
                >
                  Edit <i className="fa-solid fa-pencil" />
                </button>
                <button
                  className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleDeleteClick(index)}
                >
                  Delete <i className="fa-solid fa-trash" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioChange;
