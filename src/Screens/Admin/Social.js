import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "../../Components/Alert";
import Form from "../../Components/Form";

const Social = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [iconLinks, setIconLinks] = useState([]);
  const [isNewSocial, setIsNewSocial] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [editSocialIndex, setEditSocialIndex] = useState(null);
  const [isUpdateSocial, setIsUpdateSocial] = useState(false);
  const userId = "65647756b1e006a5838a1952";

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  const iconLinks = [
    {
      title: "Facebook",
      link:"https://www.facebook.com/",
      iconPath: "fa-brands fa-facebook-f"
    },
    {
      title: "Twitter",
      link: "https://www.twitter.com/",
      iconPath: "fa-brands fa-twitter"
    },
    {
      title: "Linkedin",
      link:"https://www.linkedin.com/",
      iconPath: "fa-brands fa-linkedin"
    },
    {
      title: "Browser",
      link:"https://www.google.com/",
      iconPath: "fa fa-globe"
    }
  ]

  const formInput = [
    {
      inputID: "title",
      inputName: "Social Media App Name",
      inputType: "text",
      inputPlaceholder: "Enter Social Media App Name",
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
    // formInput.forEach((input) => {

      // if (!formData[input.inputID]) {
      //   newError[input.inputID] = `${input.inputName} is required`;
      // }
      // else if (input.inputPattern && !input.inputPattern.test(formData[input.inputID])) {
      //   newError[input.inputID] = `Invalid ${input.inputName}`;
      // }

      // });

      if (!formData.title) {
        newError.name = "Social App Title is required";
      }
      if (!formData.link) {
        newError.name = "Account URL is required";
      }
      if (!formData.iconLink) {
        newError.name = "Social Class Name is required";
      }

    setErrors(newError);
    return newError;
  };
  const handleSubmit = (e) => {
    console.log("=======formData===", formData);
    e.preventDefault();
    const formError = validateForm();
    if (Object.keys(formError).length === 0) {
      const dataToSend = {
        title: formData.title,
        link: formData.link,
        iconLink: formData.iconLink,
        userId: userId,
      };
      console.log("Data to send: ", dataToSend);
      if (isNewSocial && editSocialIndex !== null) {
        console.log("User ID :", formData.userId);
        axios
        .put(`http://localhost:3000/social/${formData.userId}`, formData)
        .then((response) => {
          setSuccessMessage(
            "Congratulations! Your social information has been updated successfully"
            );
            console.log("Socail is updated", response.data);
          })
          .catch((error) => {
            setErrorMessage("Oops! Something went wrong");
            console.log("Error occurred", error);
          });
          setEditSocialIndex(null);
        } else {
          //Post data in backend
        const dataToSend = {
          title: formData.title,
          link: formData.link,
          iconLink: formData.iconLink,
          userId: userId,
        };
        console.log("Data to send: ", dataToSend);
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
      });
    } else {
      setErrorMessage("Please complete all fields");
    }
  };
  //To get Data from Backend
  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:3000/social/get/65647756b1e006a5838a1952")
  //     .then((response) => {
  //       const userData = response.data;
  //       const socialData = userData.social;
  //       console.log("==Social Data ===", socialData);
  //       const recieveData = socialData.map((item) => ({
  //         title: item.title,
  //         link: item.link,
  //         iconPath: item.iconLink,
  //         userId: item._id,
  //       }));
  //       setIconLinks(recieveData);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

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
    const deleteSocialId = socialToDelete.userId;
    console.log("Delete ID: ==", deleteSocialId);
    axios
      .delete(`http://localhost:3000/social/${deleteSocialId}`)
      .then((deleteSocial) => {
        console.log("Social is deleted", deleteSocial);
      })
      .catch((error) => {
        console.log("Error occur", error);
      });
  };
  return (
    <div className="px-2 md:ml-64">
      <h1 className="bg-cyan-500 text-center text-white uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold py-10">
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
            className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        <form className="py-10 border border-black" onSubmit={handleSubmit}>
          <div className="m-6">
            <Form
              formInput={formInput}
              errors={errors}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
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
          <button
            type="submit"
            className="text-white ml-5 bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      )}
      {isUpdateSocial && iconLinks.length !== 0 && (
        <div className="flex flex-col lg:flex-row bg-slate-700 py-10">
          {iconLinks.map((item, index) => (
            <div key={item.index} className="flex flex-row lg:flex-col my-5 lg:ml-10 justify-center">
              <i
                className={`${item.iconPath} cursor-pointer text-white mx-3 lg:my-10 lg:mx-10 rounded-full border border-white p-5 flex justify-center items-center h-10 w-10 m-1 hover:bg-white hover:text-black`}
              >
                {/* {item.link} */}
              </i>
              <button
                className="text-white bg-cyan-500 hover:bg-cyan-700 mx-3 lg:my-3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto h-auto px-5 lg:py-2.5 lg:px-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleEditClick(index)}
              >
                Edit <i className="fa-solid fa-pencil" />
              </button>
              <button
                className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto h-auto px-5 lg:px-0 lg:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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