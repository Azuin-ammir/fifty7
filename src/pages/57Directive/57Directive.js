import React from "react";
import Navbar from "../../components/57Directive/Navbar57";
import Footer from "../../components/Footer";
import Hero57 from "../../components/57Directive/Hero57";
import Portfolio57 from "../../components/57Directive/Portfolio57";
import Quotation57 from "../../components/57Directive/Quotation57";
import OurTeam57 from "../../components/57Directive/OurTeam57";
import "../../styles/57directive/57directive.css";
import Features57 from "../../components/57Directive/Features57";
import Renovate57 from "../../components/57Directive/Renovate57";

function FiftySevenDirective() {
  return (
    <div className="fiftyseven-directive-page">
      <Navbar />
      <Hero57 />
      <OurTeam57 />
      <Portfolio57 />
      {/* <Quotation57 /> */}
      <Features57 />
      <Renovate57 />

      {/* <Footer /> */}
    </div>
  );
}

export default FiftySevenDirective;