import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  // const [profileItem, setProfileItem] = useState({});

  const profileItem = {
    profileImage:
      "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/avataaars.svg",
    profileName: "Start Portfolio App",
    profileEmail: "portfolio@gmail.com",
    profilePhoneNo: "03333333111",
    profileSkills: ["Graphic Artist", "Web Designer", "Illustrator"],
    profileAddress: "Lahore Pakistan"
  };

  // For Backend
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

  return (
    <div>
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
          {profileItem.profileSkills && profileItem.profileSkills.map((skill, index) => (
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
    </div>
  );
};

export default Profile;
