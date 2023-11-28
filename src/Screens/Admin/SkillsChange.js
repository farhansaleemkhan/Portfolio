import React, { useEffect, useState } from "react";
import StarRating from "../../Components/StarRating";
import Alert from "../../Components/Alert";
import axios from "axios";
import Rating from "../../Components/Rating";
import { faColonSign } from "@fortawesome/free-solid-svg-icons";

const SkillsChange = () => {
  const [skillName, setSkillName] = useState("");
  const [skillRating, setSkillRating] = useState(0);
  const userId = "65647756b1e006a5838a1952";
  const [skillId, setSkillId] = useState("");
  const [skillData_id, setSkillData_id] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editSkillIndex, setEditSkillIndex] = useState(null);
  const [isNewSkill, setIsNewSkill] = useState(false);
  const [isUpdateSkill, setIsUpdateSkill] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [userSkills, setUserSkills] = useState([]);

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  const handleRatingChange = (rating) => {
    setSkillRating(rating);
  };

  const validateForm = () => {
    const newError = {};
    if (!skillName) {
      newError.skillName = "Skill Name is required";
    }
    if (!skillRating) {
      newError.skillRating = "Skill Rating is required";
    }

    setErrors(newError);
    return newError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formError = validateForm();

    if (Object.keys(formError).length === 0) {
      if (isNewSkill && editSkillIndex !== null) {
        const dataToEdit = {
          skills: {
            name: skillName,
            rating: skillRating,
            skillId: skillId,
          },
        };
        console.log("Data to send: ", dataToEdit);
        axios
          .put(`http://localhost:3000/skill/${skillData_id}`, dataToEdit)
          .then((response) => {
            setSuccessMessage(
              "Congratulations! Your skill has been updated successfully"
            );
            console.log("Project is updated", response.data);
            setSkillId("");
            setEditSkillIndex(null);
          })
          .catch((error) => {
            setErrorMessage("Oops! Something went wrong");
            console.log("Error occurred", error);
          });
      } else {
        // postData / add in backend
        const dataToSend = {
          skills: {
            name: skillName,
            rating: skillRating,
          },
          userId,
        };
        console.log("Data to send: ", dataToSend);
        axios
          .post("http://localhost:3000/skill/new", dataToSend)
          .then((createSkill) => {
            setSuccessMessage(
              "Congrulation! Your data has been saved successfully"
            );
            console.log("Skill is Added : ", createSkill);

            setSkillName("");
            setSkillRating(0);
          })
          .catch((error) => {
            setErrorMessage("Oop! Something went wrong");
            console.log("Error occur", error);
          });
      }
    } else {
      setErrorMessage("Please complete all input fields");
    }
  };

  //Get Data from Backend
  const fetchData = () => {
    axios
      .get("http://localhost:3000/skill/get/65647756b1e006a5838a1952")
      .then((response) => {
        // console.log("Data", response.data);
        const userData = response.data;
        const skillData = userData.skill;

        const id = skillData._id;
        setSkillData_id(id);

        const skills = skillData.skills;
        // console.log("Skill Data Array ==", skills);
        const recieveData = skills.map((item) => ({
          name: item.name,
          rating: item.rating,
          skillId: item._id,
        }));
        console.log("Recieve Data ==", recieveData);
        setUserSkills(recieveData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  //Edit skill
  const handleEditClick = (index) => {
    const skillToEdit = userSkills[index];

    console.log("Index==", index);
    console.log("Skill==", skillToEdit);

    setSkillName(skillToEdit.name);
    setSkillRating(skillToEdit.rating);
    setSkillId(skillToEdit.skillId);

    setIsNewSkill(true);
    setIsUpdateSkill(false);
    setEditSkillIndex(index);
    setIsVisible(false);
  };

  //Delete Skill from list
  const handleDeleteClick = (index) => {
    const skillToDelete = userSkills[index];
    // console.log("Skill delete ==", skillToDelete);
    const deleteSkillId = skillToDelete.skillId;
    // console.log("delete skill id ===", deleteSkillId);
    // console.log("skill data id ===", skillData_id);
    const dataToDelete = {
      skillId: deleteSkillId,
    };
    // console.log("Data to Delete", dataToDelete);
    axios
      .delete(`http://localhost:3000/skill/${skillData_id}`, {
        data: dataToDelete,
      })
      .then((response) => {
        setSuccessMessage(
          "Congratulations! Selected skill has been deleted successfully"
        );
        console.log("Skill is deleted", response.data);
      })
      .catch((error) => {
        setErrorMessage("Oops! Something went wrong");
        console.log("Error occurred", error);
      });
  };

  return (
    <>
      <div className="text-center p-5 md:ml-64">
        <h1 className="text-5xl py-10 font-bold bg-cyan-500 text-white uppercase">
          Skills
        </h1>

        {userSkills.length !== 0 && isVisible && (
          <div className="border border-black p-5 text-left">
            <div className="bg-slate-700 text-white p-3">
              <label
                htmlFor="projectSelect"
                className="block font-bold text-lg"
              >
                Select an option
              </label>
            </div>
            <br />
            <button
              type="submit"
              className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                setIsNewSkill(true);
                setIsUpdateSkill(false);
                setIsVisible(false);
              }}
            >
              Add New Skill
            </button>
            <br />
            <br />
            <button
              type="submit"
              className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                setIsUpdateSkill(true);
                setIsNewSkill(false);
                setIsVisible(false);
              }}
            >
              Edit Already Added Skill
            </button>
          </div>
        )}

        {(isNewSkill || userSkills.length === 0) && (
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
                    <p className="text-red-500 text-sm">{errors.skillName}</p>
                  )}
                </div>
                <label
                  htmlFor="skillRating"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Give Skill Rating
                </label>
                <span>Rating: {skillRating}</span>
                {/* <Rating value={skillRating} /> */}

                <StarRating
                  // skillName={skillName}
                  setSkillRating={handleRatingChange}
                  value={skillRating}
                />
                {errors.skillRating && (
                  <p className="text-red-500 text-sm">{errors.skillRating}</p>
                )}
              </div>
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
              className="text-white ml-5 bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </form>
        )}

        {isUpdateSkill && userSkills.length !== 0 && (
          <div className="bg-slate-700 text-center py-20">
            <p className="text-2xl text-white font-black">
              <i className="fa-solid fa-minus"></i>
              <i className="fa-solid fa-minus"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-minus"></i>
              <i className="fa-solid fa-minus"></i>
            </p>
            <div className="text-white flex flex-col px-48 py-5">
              {userSkills &&
                userSkills.map((skill, index) => (
                  <div key={index} className="flex flex-row items-center">
                    <p className="text-white text-3xl p-5">{skill.name}</p>
                    <Rating value={skill.rating} />
                    <br />
                    <button
                      className="text-white ml-10 bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit <i className="fa-solid fa-pencil" />
                    </button>
                    <button
                      className="text-white ml-5 bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleDeleteClick(index)}
                    >
                      Delete <i className="fa-solid fa-trash" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SkillsChange;