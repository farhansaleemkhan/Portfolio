import React from "react";

const Footer = () => {
  const footer = {
    location: "2215 John Daniel Drive Clark, MO 65243",
    about: "My Portfolio is a free to use, MIT licensed Tailwind CSS theme created by Start React.",
    links : [
      {
        title: "Facebook",
        link:"",
        iconPath: "fa-brands fa-facebook-f"
      },
      {
        title: "Twitter",
        link: "",
        iconPath: "fa-brands fa-twitter"
      },
      {
        title: "Linkedin",
        link:"",
        iconPath: "fa-brands fa-linkedin"
      },
      {
        title: "Browser",
        link:"",
        iconPath: "fa fa-globe"
      }
    ]
  } 
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
                  footer.links.map((item) => (
                    <i key={item.title} className={`${item.iconPath} cursor-pointer rounded-full border border-white p-3 flex justify-center items-center h-10 w-10 m-1 hover:bg-white hover:text-black`}>{item.link}</i>
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
