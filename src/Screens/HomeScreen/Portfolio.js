import React from "react";

const Portfolio = () => {
  const portfolioData = [
    {
      title: "Cabin",
      path : "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/cabin.png"
    },
    {
      title: "Cake",
      path: "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/cake.png"
    },
    {
      title: "Circus",
      path: "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/circus.png"
    },
    {
      title: "Game",
      path: "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/game.png"
    },
    {
      title: "Safe",
      path: "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/safe.png"
    },
    {
      title: "Submarine",
      path: "https://startbootstrap.github.io/startbootstrap-freelancer/assets/img/portfolio/submarine.png"
    }
  ]
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
        <div className="grid grid-cols-3 grid-rows-2 p-8 gap-8">
            {portfolioData.map((data) => (
          <div className="items-center h-48 w-64 rounded align-center justify-center hover:bg-cyan-500 hover:text-white hover:opacity-75">
            <img key={data.title}
              className="hover:opacity-25 h-48 w-64 rounded"
              src={data.path} alt={data.title}
            />
          </div>
            ))}
          
        </div>
      </div>
    </>
  );
};
export default Portfolio;
