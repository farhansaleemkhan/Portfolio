import React, { useState, useEffect } from "react";
import axios from "axios";

const Footer = () => {
  const [iconLinks ,setIconLinks] = useState([]);
  const footer = {
    location: "2215 John Daniel Drive Clark, MO 65243",
    about: "My Portfolio is a free to use, MIT licensed Tailwind CSS theme created by Start React.",
    // iconLinks : [
    //   {
    //     title: "Facebook",
    //     link:"https://www.facebook.com/",
    //     iconPath: "fa-brands fa-facebook-f"
    //   },
    //   {
    //     title: "Twitter",
    //     link: "https://www.twitter.com/",
    //     iconPath: "fa-brands fa-twitter"
    //   },
    //   {
    //     title: "Linkedin",
    //     link:"https://www.linkedin.com/",
    //     iconPath: "fa-brands fa-linkedin"
    //   },
    //   {
    //     title: "Browser",
    //     link:"https://www.google.com/",
    //     iconPath: "fa fa-globe"
    //   }
    // ]
  }
  
  //Backend Connection
  const fetchData = () => {
    axios
      .get("http://localhost:3000/social/get/65647756b1e006a5838a1952")
      .then((response) => {
        const userData = response.data;
        const socialData = userData.social;
        console.log("==Social Data ===",socialData)
        const recieveData = socialData.map((item) => ({
          title: item.title,
          link: item.link,
          iconPath: item.iconLink,
        }));
        setIconLinks(recieveData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      <div className="bg-slate-700 py-20 text-center">
        <footer className="text-white flex flex-row">
          <div className="px-20">
            <h1 className="text-2xl font-extrabold">Location</h1>
            <p className="text-xl">{footer.location}</p>
          </div>
          <div className="px-20">
            <h1 className="text-2xl font-bold">Around the web</h1>
            <div className="flex flex-row">
              {
                  iconLinks.map((item) => (
                    <div key={item.title}>
                      <a href={item.link} target="_blank" className={`${item.iconPath} cursor-pointer rounded-full border border-white p-3 flex justify-center items-center h-10 w-10 m-1 hover:bg-white hover:text-black`} />
                    </div>
                  ))
              }
            </div>
          </div>
          <div className="px-20">
            <h1 className="text-2xl font-bold">About My Portfolio</h1>
            <p className="text-xl">
              {footer.about}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Footer;
