import React from "react";

import { useSelector } from "react-redux";
import { CRow, CCol } from "@coreui/react";
import MapComponent from "./google-map";
import Configuration from "./configuration";
import "./route-planner.scss";
import "@annotationhub/react-golden-layout/dist/css/goldenlayout-base.css";
import "@annotationhub/react-golden-layout/dist/css/themes/goldenlayout-light-theme.css";

const RoutePlanner = () => {
  return (
    <div className="route-planner-layout">
      <CRow className="h-100">
        <CCol className="h-100" xs="12" md="6">
          <Configuration />
        </CCol>
        <CCol className="h-100" xs="12" md="6">
          <MapComponent />
        </CCol>
      </CRow>
    </div>
  );
};

export default RoutePlanner;
