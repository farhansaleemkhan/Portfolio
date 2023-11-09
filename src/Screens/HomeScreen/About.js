import axios from "axios";
import React, { useEffect, useState } from "react";

const About = () => {
  // const [aboutText , setAboutText] = useState([])
  const aboutText = {
      // intro: "Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.",
      aboutDescription:
        "Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization. You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!",
      resumeURL: "",
    };

  //For Backend
  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:3000/abouts")
  //     .then((response) => {
  //       const recieveData = response.data.map((item) => ({
  //         aboutDescription : item.description,
  //         resumeURL : item.resume
  //       }));
  //       setAboutText(recieveData);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div className="bg-cyan-500 text-center py-20">
        <a className="text-5xl font-bold text-white uppercase" name="about">
          About
        </a>
        <p className="text-2xl text-white font-black">
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
        </p>
            <div className="text-white flex flex-row px-80 py-5">
              {/* <p className="text-left">{aboutText.intro}</p> */}
              <p className="text-left">{aboutText.aboutDescription}</p>
            </div>
            <button
              className="text-white outline outline-white rounded-full hover:bg-white hover:text-black text-lg p-2"
              type="button"
            >
              <i className="fa fa-download"></i>Download Resume!{aboutText.resumeURL}
            </button>
      </div>
    </>
  );
};
export default About;
