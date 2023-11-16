import axios from "axios";
import React, { useEffect, useState } from "react";


const Rating = ({ value }) => {
  const stars = [];

  // Filling the stars based on the rating value
  for (let i = 1; i <= 5; i++) {
    if (i <= value) {
      stars.push(<i key={i} className="fa fa-star text-yellow-500" />);
    } else {
      stars.push(<i key={i} className="fa fa-star text-gray-300" />);
    }
  }

  return <div>{stars}</div>;
};

const Skills = () => {
  // const [userSkills , setUserSkills] = useState([])
  
  const userSkills = [
    {name: "React", rating: "3"},
    {name: "Node", rating: "2"},
  ]

  // For Backend
  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:3000/users")
  //     .then((response) => {
  //       console.log("Data", response.data)
  //       const userData = response.data;
  //       const recieveData = {
  //         profileSkills: userData.skills,
  //       };
  //       setUserSkills(recieveData);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div className="bg-slate-700 text-center py-20">
        <a className="text-5xl font-bold text-white uppercase" name="skill">
          Skills
        </a>
        <p className="text-2xl text-white font-black">
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
        </p>
            <div className="text-white flex flex-row px-80 py-5">
            {userSkills && userSkills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center">
            <p className="text-white text-3xl p-5">{skill.name}</p>
            <Rating value={skill.rating} />
            <br></br>
          </div>
          ))}
            </div>
      </div>
    </>
  );
};
export default Skills;
