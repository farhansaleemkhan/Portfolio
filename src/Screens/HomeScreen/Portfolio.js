import axios from "axios";
import React, { useEffect, useState } from "react";

const Portfolio = () => {
  // const [portfolioData, setPortfolioData] = useState([])

  const portfolioData = [
    {
      projectName: "Cabin",
      projectImage:
        "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/cabin.png",
      projectDescription: "",
      projectStartDate: "",
      projectEndDate: "",
      projectLanguage: "",
    },
    {
      projectName: "Cake",
      projectImage:
        "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/cake.png",
      projectDescription: "",
      projectStartDate: "",
      projectEndDate: "",
      projectLanguage: "",
    },
    {
      projectName: "Circus",
      projectImage:
        "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/circus.png",
      projectDescription: "",
      projectStartDate: "",
      projectEndDate: "",
      projectLanguage: "",
    },
    {
      projectName: "Game",
      projectImage:
        "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/game.png",
      projectDescription: "",
      projectStartDate: "",
      projectEndDate: "",
      projectLanguage: "",
    },
    {
      projectName: "Safe",
      projectImage:
        "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/safe.png",
      projectDescription: "",
      projectStartDate: "",
      projectEndDate: "",
      projectLanguage: "",
    },
    {
      projectName: "Submarine",
      projectImage:
        "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/submarine.png",
      projectDescription: "",
      projectStartDate: "",
      projectEndDate: "",
      projectLanguage: "",
    },
  ];

  //For Backend
  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:3000/projects")
  //     .then((response) => {
  //       const userData = response.data;
  //       const projectData = userData.projects;
  //       const recieveData = projectData.map((item) => ({
  //         projectName: item.name,
  //         projectImage: item.image,
  //         projectDescription: item.description,
  //         projectStartDate: item.startDate,
  //         projectEndDate: item.endDate,
  //         projectLanguage: item.language,
  //       }));
  //       setPortfolioData(recieveData);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div className="text-center p-24">
        <a className="text-5xl font-bold uppercase" name="portfolio">
          Portfolio
        </a>
        <p className="text-2xl font-black">
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
        </p>
        <div className="grid grid-cols-3 grid-rows-2 my-10 gap-24">
          {portfolioData.map((data) => (
            <div className="items-center h-48 w-64 my-10 rounded">
              <div className="align-center justify-center hover:bg-cyan-500 hover:rounded hover:text-white hover:opacity-75">
                <img
                  key={data.projectName}
                  className="hover:opacity-25 h-48 w-64 rounded"
                  src={data.projectImage}
                  alt={data.projectName}
                />
              </div>
              <div className="bg-slate-700 pl-1 rounded text-white py-5">
                <p className="font-semibold">Project Name: {data.projectName}</p>
                <p className="">Project Description: {data.projectDescription}</p>
                <p className="">Start Date: {data.projectStartDate}</p>
                <p className="">End Date: {data.projectEndDate}</p>
                <p className="">Technology: {data.projectLanguage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Portfolio;
