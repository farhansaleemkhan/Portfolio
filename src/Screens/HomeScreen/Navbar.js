import React, { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(!showMenu);
  };

  const navbarItems = [
    {
      title: "Portfolio",
      path: "#portfolio",
    },
    {
      title: "Skills",
      path: "#skill",
    },
    {
      title: "About",
      path: "#about",
    },
    {
      title: "Contact US",
      path: "#contact",
    },
  ];

  return (
    <div className="bg-slate-700 top-0">
      <nav className="p-7 text-xl flex justify-between items-center relative">
        <h1 className="px-5 md:pl-10 font-extrabold text-xl sm:text-2xl md:text-3xl text-white uppercase">
          Portfolio
        </h1>
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-sm text-white rounded-lg focus:outline-white focus:ring-2 focus:ring-gray-200 dark:text-white"
            onClick={openMenu}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div
          className={`${
            showMenu ? "block" : "hidden"
          } bg-slate-700 md:flex md:flex-col md:items-start absolute top-full left-0 w-full md:bg-transparent md:z-auto md:relative lg:pl-60 md:pl-7 sm:pl-0 sm:w-full`}
        >
          <ul className="text-white text-lg md:text-xl md:text-right font-medium md:font-semibold lg:font-bold uppercase flex text-left flex-col md:flex-row">
            {navbarItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  onClick={() => setShowMenu(false)}
                  className="block py-2 px-4 md:px-3 lg:px-6 hover:text-cyan-500"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
