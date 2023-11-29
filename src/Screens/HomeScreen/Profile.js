import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageBase64Converter from "../../Components/ImageBase64Converter";

const Profile = () => {
  const [profileItem, setProfileItem] = useState({});

  // const profileItem = {
  //   profileImage:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqWIPKg9kRQhn9r3qgpcRSACAXvg-dbTOWQiDN6b5ahLRZ-AU_ioL_uXv5Un0kNGPNhE&usqp=CAU",
  //   // "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/avataaars.svg",
  //   profileName: "Start Portfolio App",
  //   profileEmail: "portfolio@gmail.com",
  //   profilePhoneNo: "03333333111",
  //   profileSkills: ["Graphic Artist", "Web Designer", "Illustrator"],
  //   profileAddress: "Lahore Pakistan",
  // };

  // For Backend
  const fetchData = () => {
    axios
      .get("http://localhost:3000/user/65647756b1e006a5838a1952")
      .then((response) => {
        console.log("Data", response.data)
        const userData = response.data;
        const recieveData = {
          profileImage: userData.image,
          profileName: userData.name,
          profileEmail: userData.email,
          profilePhoneNo: userData.phoneNumber,
          profileAddress: userData.address,
       }
        setProfileItem(recieveData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-cyan-500 items-center py-24 flex flex-col">
        <div> 
        {/* className="h-72 w-96 m-3 rounded-full"> */}
          <ImageBase64Converter
            type = "profile"
            imageUrl={profileItem.profileImage}
            imgAlt={profileItem.profileName}
          />
          {/* <img
          className="h-72 w-96 m-3 rounded-full"
          src={}
          alt={profileItem.profileName}
        /> */}
        </div>
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
    </div>
  );
};

export default Profile;
