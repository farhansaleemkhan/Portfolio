import React from "react";

const Profile = () => {
  const profileItem = {
    image: "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/avataaars.svg",
    name: "Start Portfolio App",
    email: "portfolio@gmail.com",
    phoneNo: "+92333-3333111",
    skills: ["Graphic Artist", "Web Designer", "Illustrator"],
  };
  return (
    <div>
      <div className="bg-cyan-500 items-center py-24 flex flex-col">
        <img
          src={profileItem.image}
          alt={profileItem.name}
          className="h-72 w-96"
        />
        <p className="text-white text-5xl font-bold py-10 uppercase">
          {profileItem.name}
        </p>
        <p className="text-white font-bold text-2xl pb-5 lowercase">
          {profileItem.email}
        </p>
        <p className="text-white font-bold text-2xl lowercase">
          {profileItem.phoneNo}
        </p>
        <p className="text-white text-2xl py-5 font-black">
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
        </p>
        <div className="flex">
          {profileItem.skills.map((skill, index) => (
            <p key={index} className="text-white text-3xl">
              {skill} -&nbsp;
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
