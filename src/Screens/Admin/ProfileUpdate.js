import axios from "axios";
import React, { useState, useEffect } from "react";
import Alert from "../../Components/Alert";
import Form from "../../Components/Form";

const ProfileUpdate = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editProfile, setEditProfile] = useState(null);
  const [profileItem, setProfileItem] = useState({});
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);
  const [userId, setUserId] = useState("");

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  // const profileItem = {
  //   profileImage:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqWIPKg9kRQhn9r3qgpcRSACAXvg-dbTOWQiDN6b5ahLRZ-AU_ioL_uXv5Un0kNGPNhE&usqp=CAU",
  //   // "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/avataaars.svg",
  //   profileName: "Start Portfolio App",
  //   profileEmail: "portfolio@gmail.com",
  //   profilePhoneNo: "03333333111",
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
      // inputPattern: /^\S+@\S+\.\S+$/,
      inputPattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
    },
    {
      inputID: "phoneNumber",
      inputName: "Phone Number",
      inputType: "tel",
      inputPlaceholder: "+92 345-6789012",
      // inputPattern: /^\+92 3\d{2}-\d{7}$/,
    },
    {
      inputID: "image",
      inputName: "Image URL",
      inputType: "url",
      inputPlaceholder: "http://flowbite.com",
      // inputPattern: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
      inputPattern: /^((http(s)?:\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)|(data:image\/[a-zA-Z+]+;base64,[-\/+=a-zA-Z0-9]+))$/,
    },
    {
      inputID: "address",
      inputName: "Address",
      inputType: "text",
      inputPlaceholder: "Enter your Address start with House No",
      inputPattern: /^House No.\S+\,\S+$/,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    image: "",
    address: "",
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
    if (!formData.address) {
      newError.address = "Address is required";
    }

    setErrors(newError);
    return newError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formError = validateForm();

    if (Object.keys(formError).length === 0) {
      if (editProfile) {
        //For Updating data
        const dataToUpdate = {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          image: formData.image,
          address: formData.address,
        };

        console.log("Data to Update: ", dataToUpdate);
        axios
          .put("http://localhost:3000/user/65647756b1e006a5838a1952", dataToUpdate)
          .then((updateProfile) => {
            setSuccessMessage(
              "Congratulations! Your profile has been updated successfully"
            );
            console.log("Profile is updated", updateProfile);
            setEditProfile(null);
          })
          .catch((error) => {
            setErrorMessage("Oops! Something went wrong");
            console.log("Error occurred", error);
          });
      } else {
        //For Creating new Backend part
        const dataToSend = {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          image: formData.image,
          address: formData.address,
        };

        console.log("Data to send: ", dataToSend);
        axios
          .post("http://localhost:3000/user/new", dataToSend)
          .then((createProfile) => {
            setSuccessMessage(
              "Congrulation! Your profile has been created successfully"
            );
            console.log("Profile is updated", createProfile);
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
        address: "",
      });
    } else {
      setErrorMessage("Please complete all the fields");
    }
  };

  // For getting data from Backend
  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:3000/user/65647756b1e006a5838a1952")
  //     .then((response) => {
  //       console.log("Data", response.data)
  //       const userData = response.data;
  //       const recieveData = {
  //         profileImage: userData.image,
  //         profileName: userData.name,
  //         profileEmail: userData.email,
  //         profilePhoneNo: userData.phoneNumber,
  //         profileAddress: userData.address,
  //         userId: userData._id,
  //       };
  //       console.log("Recieve Data ==",recieveData);
  //       setProfileItem(recieveData);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleEditClick = (profile) => {
    setEditProfile(profile);
    console.log("Edit profile ==", profile);
    setFormData({
      image: profile.profileImage,
      name: profile.profileName,
      email: profile.profileEmail,
      phoneNumber: profile.profilePhoneNo,
      // skills: profile.profileSkills ? profile.profileSkills.join(",") : "",
      address: profile.profileAddress,
    });
    setUserId(profile.userId);
    setIsUpdateProfile(true);
  };

  return (
    <div className="px-2 md:ml-64">
      <h1 className="bg-slate-700 text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold py-10 uppercase">
        Profile
      </h1>

      {!isUpdateProfile && Object.keys(profileItem).length !== 0 && (
        <>
          <div className="bg-cyan-500 items-center flex flex-col py-44 md:py-24">
            <img
              src={profileItem.profileImage}
              alt={profileItem.profileName}
              className="h-48 w-56 sm:h-56 sm:w-64 md:h-72 md:w-80 m-3 rounded-full"
            />
            <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black py-5">
              <i className="fa-solid fa-minus"></i>
              <i className="fa-solid fa-minus"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-minus"></i>
              <i className="fa-solid fa-minus"></i>
            </p>
            <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold py-10 uppercase">
              {profileItem.profileName}
            </p>
            <p className="lowercase text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl pb-3">
              {profileItem.profileEmail}
            </p>
            <p className="lowercase text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl pb-3">
              {profileItem.profilePhoneNo}
            </p>
            <p className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl pb-3">
              {profileItem.profileAddress}
            </p>
          </div>
          <button
            className="text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleEditClick(profileItem)}
          >
            Edit <i className="fa-solid fa-pencil" />
          </button>
        </>
      )}
      {(Object.keys(profileItem).length === 0 || isUpdateProfile) && (
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
    </div>
  );
};

export default ProfileUpdate;