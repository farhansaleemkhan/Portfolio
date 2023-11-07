import React, { useEffect, useState } from "react";
// import Axios from "axios";

const AboutChange = () => {
  const [description, setDescription] = useState("");
  const [resume, setResume] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newError = {}
    if(!description){
      newError.description = "Description is required";
    }
    if(!resume){
      newError.resume = "Resume URL is required";
    }
    setErrors(newError);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();

    console.log("Description", description);
    console.log("Resume URL", resume)
    
    if (Object.keys(errors).length === 0) {
      setDescription("");
      setResume("");
      
    }
  };

  useEffect(() => {}, [])


  return (
    <div className="p-5 md:ml-64">
      <h1 className="text-4xl py-8 font-bold bg-cyan-500 text-center text-white uppercase">
        About
      </h1>
      <form className="py-10" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            About yourself
          </label>
          <textarea
            className={`bg-gray-50 appearance-none border mt-5 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              errors.description ? "border-red-500" : ""
            }`}
            rows="5"
            cols="5"
            type="text"
            value={description}
            id="description"
            placeholder="Write about yourself"
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
        </div>
        <div>
          <label
            htmlFor="resumeUrl"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Resume Link
          </label>
          <input
            className={`bg-gray-50 appearance-none border mt-5 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              errors.resume ? "border-red-500" : ""
            }`}
            type="url"
            id="resumeUrl"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="http://flowbite.com"
          />
          {errors.resume && (
                  <p className="text-red-500 text-sm">{errors.resume}</p>
                )}
        </div>
        <button
          type="submit"
          className="text-white my-5 bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AboutChange;
