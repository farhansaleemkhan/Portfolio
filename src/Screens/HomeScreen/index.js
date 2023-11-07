import React from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Portfolio from "./Portfolio";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";

const HomeScreen = () => {
  return (
    <>
      <Navbar />
      <Profile />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default HomeScreen;
