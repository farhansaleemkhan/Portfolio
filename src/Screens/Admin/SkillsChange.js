import React, { useState } from "react";
import StarRating from "../../Components/StarRating";
import ErrorAlert from "../../Components/ErrorAlert";
import SuccessAlert from "../../Components/SuccessAlert";
import axios from "axios";

const SkillsChange = () => {
  const [skillName, setSkillName] = useState("");
  const [skillRating, setSkillRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  // const handleRatingChange = (skillName, rating) => {
  //   setSkillRating((prev) => ({ ...prev, [skillName]: rating }));
  // };



  const handleRatingChange = (rating) => {
    setSkillRating(rating);
    }
    

  const validateForm = () => {
    const newError = {};
    if(!skillName){
      newError.skillName = "Skill Name is required";
    }
    if(!skillRating){
      newError.skillRating = "Skill Rating is required";
    }
    
    setErrors(newError);
    return newError;
  };

  const handleSubmit = (e) => {
    console.log("=======Name===", skillName);
    console.log("====Rating===",skillRating);

    e.preventDefault();
    const formError = validateForm();

    if (Object.keys(formError).length === 0) {
      
      // postData();
      const response = axios.post("http://localhost:3000/about/new", {
        skillName,
        skillRating
      })
      .then((createSkill)=>{
        setSuccessMessage("Congrulation! Your data has been saved successfully")
        console.log("About is Added : ",createSkill);
      })
      .catch((error) => {
        setErrorMessage("Oop! Something went wrong")
        console.log("Error occur", error)
      });
      console.log("======Response======", response);
      
        setSkillName("");
        setSkillRating(0);
    } else {
      setErrorMessage("Please complete all input fields");
    }
  };

  return (
    <>
      <div className="text-center p-5 md:ml-64">
        <h1 className="text-5xl py-10 font-bold bg-cyan-500 text-white uppercase">
          Skills
        </h1>

        <form className="py-10 border border-black" onSubmit={handleSubmit}>
          <div className="m-6">
            
              <div className="text-left mb-5">
                <label
                  htmlFor="skillName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Skill Name:
                </label>
                <div>
                  <input
                    type="text"
                    id="skillName"
                    className={`bg-gray-50 appearance-none border mt-5 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.skillName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter Skill Name"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                  />
                  {errors.skillName && (
                    <p className="text-red-500 text-sm">
                      {errors.skillName}
                    </p>
                  )}
                  </div>
                  <label
                  htmlFor="skillRating"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Give Skill Rating
                </label>
                    <span>Rating: {skillRating}</span>
                  <StarRating
                    // skillName={skillName}
                    setSkillRating={handleRatingChange}
                  />
                {errors.skillRating && (
                  <p className="text-red-500 text-sm">{errors.skillRating}</p>
                )}
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
      </div>
    </>
  );
};

export default SkillsChange;
