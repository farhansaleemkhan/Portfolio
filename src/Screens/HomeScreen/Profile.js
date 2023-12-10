import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageBase64Converter from "../../Components/ImageBase64Converter";

const Profile = () => {
  // const [profileItem, setProfileItem] = useState({});

  const profileItem = {
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqWIPKg9kRQhn9r3qgpcRSACAXvg-dbTOWQiDN6b5ahLRZ-AU_ioL_uXv5Un0kNGPNhE&usqp=CAU",
    // "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/avataaars.svg",
    profileName: "Start Portfolio App",
    profileEmail: "portfolio@gmail.com",
    profilePhoneNo: "03333333111",
    profileAddress: "Lahore Pakistan",
  };

  // For Backend
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
  //      }
  //       setProfileItem(recieveData);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="bg-cyan-500 items-center py-44 md:py-24 flex flex-col">
        <div> 
        {/* className="h-72 w-96 m-3 rounded-full"> */}
          <ImageBase64Converter
            imageUrl={profileItem.profileImage}
            imgAlt={profileItem.profileName}
            styleClass="h-48 w-56 sm:h-56 sm:w-64 md:h-72 md:w-80 m-3 rounded-full"
          />
          {/* <img
          className="h-72 w-96 m-3 rounded-full"
          src={}
          alt={profileItem.profileName}
        /> */}
        </div>
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
        <p className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl lowercase pb-3">
          {profileItem.profileEmail}
        </p>
        <p className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl pb-3">
          {profileItem.profilePhoneNo}
        </p>
        {/* <div className="flex">
          {profileItem.profileSkills &&
            profileItem.profileSkills.map((skill, index) => (
              <p key={index} className="text-white text-3xl">
                {skill}
                {index < profileItem.profileSkills.length - 1 && " - "}
              </p>
            ))}
        </div> */}
        <p className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl pb-3">
          {profileItem.profileAddress}
        </p>
      </div>
    </div>
  );
};

export default Profile;
