import axios from "axios";
import React, { useEffect, useState } from "react";
import SuccessAlert from "../../Components/SuccessAlert";
import ErrorAlert from "../../Components/ErrorAlert";

const Social = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [iconLinks ,setIconLinks] = useState([]);
  const [isNewSocial, setIsNewSocial] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [editSocialIndex, setEditSocialIndex] = useState(null);
  const [isUpdateSocial, setIsUpdateSocial] = useState(false);
  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };
  // const iconLinks = [
  //   {
  //     title: "Facebook",
  //     link: "",
  //     iconPath: "fa-brands fa-facebook-f",
  //   },
  //   {
  //     title: "Twitter",
  //     link: "",
  //     iconPath: "fa-brands fa-twitter",
  //   },
  //   {
  //     title: "Linkedin",
  //     link: "",
  //     iconPath: "fa-brands fa-linkedin",
  //   },
  //   {
  //     title: "Browser",
  //     link: "",
  //     iconPath: "fa fa-globe",
  //   },
  // ];
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
    {
      inputID: "userId",
      inputName: "User ID",
      inputType: "text",
      inputPlaceholder: "Enter User ID",
      inputPattern: "^[a-zA-Z0-9._%+-]+$",
    },
  ];
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    iconLink: "",
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
    validateForm();
    if (Object.keys(errors).length === 0) {
      const dataToSend = {
        title: formData.title,
        link: formData.link,
        iconLink: formData.iconLink,
        userId: formData.userId,
      };
      console.log("Data to send: ", dataToSend);
      if(isNewSocial && editSocialIndex !== null){
        console.log("User ID :",formData.userId);
        axios
          .put(`http://localhost:3000/social/${formData.userId}`, formData)
          .then((response) => {
            setSuccessMessage("Congratulations! Your social information has been updated successfully");
            console.log("Socail is updated", response.data);
          })
          .catch((error) => {
            setErrorMessage("Oops! Something went wrong");
            console.log("Error occurred", error);
          });
        setEditSocialIndex(null);
      }
      else{
        //Post data in backend
        axios
          .post("http://localhost:3000/social/new", dataToSend)
          .then((updateSocial) => {
            setSuccessMessage(
              "Congrulation! Your data has been saved successfully"
            );
            console.log("Social Fields are updated", updateSocial);
          })
          .catch((error) => {
            console.log("Error occur", error);
            setErrorMessage("Oops! Something went wrong");
          });
      }
      setFormData({
        title: "",
        link: "",
        iconLink: "",
        userId: "",
      });
    } else {
      setErrorMessage("Please complete all fields");
    }
  };
  //To get Data from Backend
  const fetchData = () => {
    axios
      .get("http://localhost:3000/social/get/6551eccc142be4f7b2fc6337")
      .then((response) => {
        const userData = response.data;
        const socialData = userData.social;
        console.log("==Social Data ===",socialData)
        const recieveData = socialData.map((item) => ({
          title: item.title,
          link: item.link,
          iconPath: item.iconLink,
          userId: item._id,
        }));
        setIconLinks(recieveData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleEditClick = (index) => {
    const iconToEdit = iconLinks[index];
    setFormData({
      title: iconToEdit.title,
      link: iconToEdit.link,
      iconLink: iconToEdit.iconPath,
      userId: iconToEdit.userId,
    });
    setEditSocialIndex(index);
    setIsUpdateSocial(false);
    setIsNewSocial(true);
    setIsVisible(false);
  };
  //Delete About section
  const handleDeleteClick = (index) => {
    const socialToDelete = iconLinks[index];
    const deleteSocialId = socialToDelete.userId
    console.log("Delete ID: ==",deleteSocialId)
    axios
    .delete(`http://localhost:3000/social/${deleteSocialId}`)
    .then((deleteSocial) => {
      setSuccessMessage(
        "Congrulation! Selected item has been deleted successfully"
      );
      console.log("Social is deleted", deleteSocial);
    })
    .catch((error) => {
      setErrorMessage("Oops! Something went wrong");
      console.log("Error occur", error);
    });
  }
  return (
    <div className="text-center p-5 md:ml-64">
      <h1 className="text-4xl py-8 font-bold bg-cyan-500 text-center text-white uppercase">
        Social Links
      </h1>
      {iconLinks.length !== 0 && isVisible && (
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
              setIsNewSocial(true);
              setIsUpdateSocial(false);
              setIsVisible(false);
            }}
          >
            Add new Social Detail
          </button>
          <br />
          <br />
          <button
            type="submit"
            className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setIsUpdateSocial(true);
              setIsNewSocial(false);
              setIsVisible(false);
            }}
          >
            Change Existing Social Detail
          </button>
        </div>
      )}
      {(iconLinks.length === 0 || isNewSocial) && (
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
      {isUpdateSocial && iconLinks.length !== 0 && (
        <div className="flex flex-row bg-slate-700 py-20 text-center">
          {iconLinks.map((item, index) => (
            <div key={item.index}>
              <i
                className={`${item.iconPath} cursor-pointer text-white mx-10 rounded-full border border-white p-5 flex justify-center items-center h-10 w-10 m-1 hover:bg-white hover:text-black`}
              >
                {/* {item.link} */}
              </i>
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
          ))}
        </div>
      )}
    </div>
  );
};
export default Social;