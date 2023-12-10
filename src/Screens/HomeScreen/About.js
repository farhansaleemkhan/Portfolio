import axios from "axios";
import React, { useEffect, useState } from "react";

const About = () => {
  // const [aboutData , setAboutData] = useState({})
  const aboutData = {
      // intro: "Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.",
      aboutDescription:
        "Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization. You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!",
      // resumeURL: "https://drive.google.com/file/d/1vw9RGngAo9Y43z9G-wTxaHBKejxAo8Jz/view?usp=drivesdk",
    };

  //For Backend
  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:3000/about/get/65647756b1e006a5838a1952")
  //     .then((response) => {
  //      const userData = response.data;
  //      const recieveData = userData.about;
  //       setAboutText({
  //         aboutDescription : recieveData.description,
  //       });
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  //Download Resume from Backend
  // const downloadResume = () => {
  //   const resumeLink = aboutData.resumeURL;
  //   const link = document.createElement("a");
  //   link.href = resumeLink;
  //   link.download = "resume.pdf";
  //   link.target = "_blank";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  return (
    <>
      <div className="bg-cyan-500 text-center py-10 lg:py-20">
        <a className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase" name="about">
          About
        </a>
        <p className="text-xl md:text-2xl lg:text-3xl text-white font-black py-5">
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
        </p>
            <div className="text-white flex flex-row px-10 sm:px-40 md:px-60 lg:px-80  py-5">
              {/* <p className="text-left">{aboutText.intro}</p> */}
              <p className="text-left text-sm sm:text-lg">{aboutData.aboutDescription}</p>
            </div>
            {/* <button
              className="text-white outline outline-white rounded-full hover:bg-white hover:text-black text-lg p-2"
              // type="button"
              onClick={downloadResume}
            >
              <i className="fa fa-download"></i>Download Resume!
            </button> */}
      </div>
    </>
  );
};
export default About;
