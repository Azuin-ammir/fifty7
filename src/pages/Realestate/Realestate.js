import React from "react";
import RealEstateEnquiry from "../../components/RealEstate/RealEstateEnquiry";
import RealEstateheroBanner from "../../components/RealEstate/RealEstateHeroBanner";
import "../../styles/realestate/estate_enquiry.css";

function SellYourPlace() {
  return (
    <div>
      <RealEstateheroBanner />
      <RealEstateEnquiry />
    </div>
  );
}

export default SellYourPlace;