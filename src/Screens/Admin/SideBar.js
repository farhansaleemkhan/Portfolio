import React from "react";
import { Link } from "react-router-dom";


const SideBar = () => {
  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-slate-700  dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <p
                className="flex items-center p-2 text-white rounded-lg dark:text-white group uppercase text-2xl font-black"
              >
                <span className="ml-3">My Portfolio</span>
              </p>
            </li>
            <li>
              <Link
                to={'/admin/profileUpdate'}
                className="flex items-center p-2 text-white hover:text-gray-900 rounded-lg dark:text-white hover:bg-cyan-500 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/portfolioChange"}
                className="flex items-center p-2 text-white hover:text-gray-900 rounded-lg dark:text-white hover:bg-cyan-500 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Portfolio</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/aboutChange"}
                className="flex items-center p-2 text-white hover:text-gray-900 rounded-lg dark:text-white hover:bg-cyan-500 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">About</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/inbox"}
                className="flex items-center p-2 text-white hover:text-gray-900 rounded-lg dark:text-white hover:bg-cyan-500 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/socialChange"}
                className="flex items-center p-2 text-white hover:text-gray-900 rounded-lg dark:text-white hover:bg-cyan-500 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Social</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside> 
    </div>
  );
};

export default SideBar;
