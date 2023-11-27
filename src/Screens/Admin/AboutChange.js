import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../Components/Alert";
import Form from "../../Components/Form";

const AboutChange = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [aboutData , setAboutData] = useState({})
  const [editAbout, setEditAbout] = useState(null);
  const [isUpdateAbout, setIsUpdateAbout] = useState(false);
  const [aboutId, setAboutId] = useState("");
  const userId = "65647756b1e006a5838a1952";

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  const formInput = [
    {
      inputID: "aboutDescription",
      inputName: "About Yourself",
      inputType: "text",
      inputPlaceholder: "Write about yourself",
      inputPattern: "^[a-zA-Z0-9._%+-]+$",
      inputRow: "5",
      inputColumn: "5",
    },
  ];

  const [formData, setFormData] = useState({
    aboutDescription: "",
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

    if (!formData.aboutDescription) {
      newError.aboutDescription = "Description is required";
    }

    setErrors(newError);
    return newError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formError = validateForm();

    if (Object.keys(formError).length === 0) {
      if(editAbout){
        //For Updating data
        const dataToEdit = {
          description: formData.aboutDescription,
          aboutId: aboutId,
        };
        console.log("about change ===", dataToEdit);
        axios
        .put(`http://localhost:3000/about/${aboutId}`, dataToEdit)
        .then((updateAbout) => {
          setSuccessMessage(
            "Congrulation! Your data has been updated successfully"
            );
            console.log("About is updated", updateAbout);
          })
          .catch((error) => {
            setErrorMessage("Oops! Something went wrong");
            console.log("Error occur", error);
          });
        }
        else{
        //For storing data in backend
        const dataToSend = {
          description: formData.aboutDescription,
          userId: userId,
        };
        console.log("about send ===", dataToSend);
        axios
          .post("http://localhost:3000/about/new", dataToSend)
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
      }

      setFormData({
        description: "",
      });
    } else {
      setErrorMessage("Please complete all input fields");
    }
  };

  //To get about data from Backend
  const fetchData = () => {
    axios
      .get("http://localhost:3000/about/get/65647756b1e006a5838a1952")
      .then((response) => {
       const userData = response.data;
       const recieveData = userData.about;
        setAboutData({
          aboutDescription : recieveData.description,
        });
        const id= recieveData._id;
        setAboutId(id);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (about) => {
    setEditAbout(about);
    setFormData({
      aboutDescription: about.aboutDescription,
    });
    setIsUpdateAbout(true);
  };

  //Delete About section
  const handleDeleteClick = (about) => {
    axios
    .delete(`http://localhost:3000/about/${aboutId}`)
    .then((updateAbout) => {
      console.log("About is deleted", updateAbout);
    })
    .catch((error) => {
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
          <Form formInput={formInput} errors={errors} formData={formData} handleInputChange={handleInputChange} />
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
          
          <br />
          <br />
          <button
            className="text-white mr-5 bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
