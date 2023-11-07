import React from "react";

const About = () => {
  const aboutText = {
    intro: "Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.",
    description: "You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!",
    resume: ""
  }
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
            <p className="text-left">{aboutText.intro}</p>
            <p className="text-left">{aboutText.description}</p>
        </div>
        <button
          className="text-white outline outline-white rounded-full hover:bg-white hover:text-black text-lg p-2"
          type="button"
        >
          <i className="fa fa-download"></i>Download Resume!{aboutText.resume}
        </button>
      </div>
    </>
  );
};
export default About;
