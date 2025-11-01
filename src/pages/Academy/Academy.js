import React from "react";
import CarpentryHeroBanner from "../../components/Academy/CarpentryHeroBanner";
import CarpentryProfile from "../../components/Academy/CarpentryProfile";
import CarpentryVideos from "../../components/Academy/CarpentryVideos";
import CarpentryClasses from "../../components/Academy/CarpentryClasses";
import CarpentryEnquiry from "../../components/Academy/CarpentryEnquiry";
// import AcademyNavbar from "../../components/Academy/AcademyNavbar";

function Academy() {
  return (
    <div>
      {/* <AcademyNavbar /> */}
      <CarpentryHeroBanner />
      {/* <CarpentryProfile /> */}
      {/* <CarpentryVideos />
      <CarpentryClasses /> */}
      <CarpentryEnquiry />
    </div>
  );
}

export default Academy;