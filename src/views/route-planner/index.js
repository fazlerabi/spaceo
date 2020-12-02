import React from "react";

import { useSelector } from "react-redux";
import { CRow, CCol } from "@coreui/react";
import MapComponent from "./google-map";
import Configuration from "./configuration";
import "./route-planner.scss";
import "@annotationhub/react-golden-layout/dist/css/goldenlayout-base.css";
import "@annotationhub/react-golden-layout/dist/css/themes/goldenlayout-light-theme.css";

const RoutePlanner = () => {
  const isDesktop = useSelector((state) => state.isDesktop);

  return (
    <div className="route-planner-layout">
      <CRow>
        <CCol xs="12" md="6">
          <Configuration />
        </CCol>
        <CCol xs="12" md="6">
          <></>
        </CCol>
      </CRow>
    </div>
  );
};

export default RoutePlanner;
