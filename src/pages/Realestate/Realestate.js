import React from "react";
import Navbar from "../../components/Navbar";
import RealEstateEnquiry from "../../components/RealEstate/RealEstateEnquiry";
import RealEstateheroBanner from "../../components/RealEstate/RealEstateHeroBanner";
import "../../styles/realestate/estate_enquiry.css";

function SellYourPlace() {
  return (
    <div>
      <Navbar logo="/Images/RealEstate/logo.png" />
      <RealEstateheroBanner />
      <RealEstateEnquiry />
    </div>
  );
}

export default SellYourPlace;