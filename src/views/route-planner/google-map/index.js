import React from "react";
import { CCard, CCardBody } from "@coreui/react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

const defaultZoom = 11;
const defaultCenter = { lat: 37.431489, lng: -122.163719 };
const apiKey = process.env.GOOGLE_MAP_API_KEY;

const GoogleMapsComponent = withScriptjs(
  withGoogleMap(() => {
    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
      ></GoogleMap>
    );
  })
);

function MapComponent() {
  return window.google ? (
    <CCard>
      <CCardBody>
        <GoogleMapsComponent
          key="map"
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
          loadingElement={<div className="h-100" />}
          containerElement={<div className="h-100" />}
          mapElement={<div className="h-100" />}
        />
      </CCardBody>
    </CCard>
  ) : (
    <CCard className="ml-3 h-100">
      <CCardBody>test</CCardBody>
    </CCard>
  );
}

export default MapComponent;
