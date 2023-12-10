import axios from "axios";
import React, { useEffect, useState } from "react";
import Rating from "../../Components/Rating";

const Skills = () => {
  // const [userSkills , setUserSkills] = useState([])

  const userSkills = [
    { name: "HTML", rating: 5 },
    { name: "React", rating: 4 },
    { name: "Node", rating: 2 },
  ];

  // For get data from Backend
  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:3000/skill/get/65647756b1e006a5838a1952")
  //     .then((response) => {
  //       // console.log("Data", response.data);
  //       const userData = response.data;
  //       const skillData = userData.skill;
  //       const skills = skillData.skills;
  //       // console.log("Skill Data Array ==", skills);
  //       const recieveData = skills.map((item) => ({
  //         name: item.name,
  //         rating: item.rating,
  //         skillId: item._id,
  //       }));
  //       console.log("Recieve Data ==", recieveData);
  //       setUserSkills(recieveData);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div className="bg-slate-700 text-center py-10 lg:py-20">
        <a className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase" name="skill">
          Skills
        </a>
        <p className="text-xl md:text-2xl lg:text-3xl text-white font-black pt-5">
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
        </p>
        <div className="text-white flex flex-col px-20 sm:px-40 md:px-60 lg:px-96 items-center py-5">
          {userSkills &&
            userSkills.map((skill, index) => (
              <div key={index} className="flex flex-row items-center">
                <p className="text-white font-medium md:font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl p-5">{skill.name}</p>
                <Rating value={skill.rating} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Skills;
