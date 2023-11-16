import axios from "axios";
import React, { useState, useEffect } from "react";
import SuccessAlert from "../../Components/SuccessAlert";
import ErrorAlert from "../../Components/ErrorAlert";

const ProfileUpdate = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editProfile, setEditProfile] = useState(null);
  const [profileItem, setProfileItem] = useState({});
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  // const profileItem = {
  //   profileImage:
  //     "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/avataaars.svg",
  //   profileName: "Start Portfolio App",
  //   profileEmail: "portfolio@gmail.com",
  //   profilePhoneNo: "03333333111",
  //   profileSkills: ["Graphic Artist", "Web Designer", "Illustrator"],
  //   profileAddress: "Lahore Pakistan",
  // };

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
      inputPattern: "^03d{9}$",
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

      if(editProfile){
        //For Updating data
        axios
        .put(`/api/profiles/${editProfile.id}`, dataToSend)
        .then((updateProfile) => {
          setSuccessMessage(
            "Congratulations! Your profile has been updated successfully"
          );
          console.log("Profile is updated", updateProfile);
        })
        .catch((error) => {
          setErrorMessage("Oops! Something went wrong");
          console.log("Error occurred", error);
        });
      }
      else{
        //For Creating new Backend part
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
      }

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        image: "",
        skills: "",
        address: "",
      });

      setEditProfile(null);
    } else {
      setErrorMessage("Please complete all the fields");
    }
  };

  // For getting data from Backend
  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:3000/users")
  //     .then((response) => {
  //       console.log("Data", response.data)
  //       const userData = response.data;
  //       const recieveData = {
  //         profileImage: userData.image,
  //         profileName: userData.name,
  //         profileEmail: userData.email,
  //         profilePhoneNo: userData.phoneNumber,
  //         profileSkills: userData.skills,
  //         profileAddress: userData.address,
  //       };
  //       setProfileItem(recieveData);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleEditClick = (profile) => {
    setEditProfile(profile);
    setFormData({
      image: profile.profileImage,
      name: profile.profileName,
      email: profile.profileEmail,
      phoneNumber: profile.profilePhoneNo,
      skills: profile.profileSkills ? profile.profileSkills.join(",") : "",
      address: profile.profileAddress,
    });
    setIsUpdateProfile(true);
  };

  return (
    <div className="text-center p-5 md:ml-64">
      <h1 className="text-5xl py-10 font-bold bg-cyan-500 text-white uppercase">
        Profile
      </h1>

      {(!isUpdateProfile && Object.keys(profileItem).length !== 0 ) && (
        <>
          <div className="bg-cyan-500 items-center py-24 flex flex-col">
            <img
              src={profileItem.profileImage}
              alt={profileItem.profileName}
              className="h-72 w-96"
            />
            <p className="text-white text-2xl py-5 font-black">
              <i className="fa-solid fa-minus"></i>
              <i className="fa-solid fa-minus"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-minus"></i>
              <i className="fa-solid fa-minus"></i>
            </p>
            <p className="text-white text-5xl font-bold py-10 uppercase">
              {profileItem.profileName}
            </p>
            <p className="text-white font-bold text-2xl pb-5 lowercase">
              {profileItem.profileEmail}
            </p>
            <p className="text-white font-bold text-2xl lowercase">
              {profileItem.profilePhoneNo}
            </p>
            <div className="flex">
              {profileItem.profileSkills &&
                profileItem.profileSkills.map((skill, index) => (
                  <p key={index} className="text-white text-3xl">
                    {skill}
                    {/* -&nbsp; */}
                    {index < profileItem.profileSkills.length - 1 && " - "}
                  </p>
                ))}
            </div>
            <p className="text-white font-bold text-2xl">
              {profileItem.profileAddress}
            </p>
          </div>
          <button
            className="text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleEditClick(profileItem)}
          >
            Edit <i className="fa-solid fa-pencil" />
          </button>
        </>
      )} 
      {(Object.keys(profileItem).length === 0 || isUpdateProfile) && (
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
            className="text-white text-left bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileUpdate;
