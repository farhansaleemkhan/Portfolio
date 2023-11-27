import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Portfolio from "./Portfolio";
import Skills from "./Skills";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";

const HomeScreen = () => {
  const resume = useRef(null);

  const downloadResume = () => {
    const resumeContent = resume.current;
    html2canvas(resumeContent).then((canvas) => {
    const imgData = canvas.toDataURL("image/jpeg");

    const pdf = new jsPDF("p", "mm", "a0", true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST", 0);
    pdf.save("Resume.pdf");
    });
  };

  return (
    <div>
      <Navbar />

      <div ref={resume}>
        <Profile />
        <Portfolio />
        <Skills />
        <About />
      </div>

      <div className="bg-cyan-500 text-center py-10">
        <button
          className="text-white outline outline-white rounded-full hover:bg-white hover:text-black text-lg p-2"
          type="button"
          onClick={downloadResume}
        >
          Download Resume!
          <i className="fa fa-download" />
        </button>
      </div>

      <Contact />
      <Footer />
    </div>
  );
};

export default HomeScreen;
