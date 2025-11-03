import React from "react";
import Navbar from "../../components/Navbar";
import Hero57 from "../../components/57Directive/Hero57";
import Portfolio57 from "../../components/57Directive/Portfolio57";
import OurTeam57 from "../../components/57Directive/OurTeam57";
import Features57 from "../../components/57Directive/Features57";
import Renovate57 from "../../components/57Directive/Renovate57";

function FiftySevenDirective() {
  return (
    <div className="fiftyseven-directive-page">
      <Navbar logo="/Images/57Directive/directive.png" />
      <Hero57 />
      <OurTeam57 />
      <Portfolio57 />
      <Features57 />
      <Renovate57 />
    </div>
  );
}

export default FiftySevenDirective;
