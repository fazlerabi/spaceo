import React, { useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CNavLink,
  CRow,
  CCol,
  CTabs,
  CNavItem,
  CNav,
  CTabPane,
  CTabContent,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";
import { FaPlus, FaAddressBook, FaRoute } from "react-icons/fa";
import AddressForm from "../forms/address-form";

const apiKey = "AIzaSyCB5ELK-MyT_h_XUxkLz8gVlEIlloseKyo";

const defaultZoom = 11;
const defaultCenter = { lat: 37.431489, lng: -122.163719 };

const GoogleMapsComponent = withScriptjs(
  withGoogleMap(() => {
    return (
      <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
      </GoogleMap>
    );
  })
);

const ReactGoogleMaps = () => {
  const [active, setActive] = useState(0);

  return (
    <>
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Planner
            </CCardHeader>
            <CCardBody>
              <CTabs activeTab={active} color="dark" onActiveTabChange={idx => setActive(idx)}>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                      <FaAddressBook />
                      { active === 0 && ' Address'}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      <FaRoute />
                      { active === 1 && ' Routes'}
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <CDropdown className="mt-4">
                      <CDropdownToggle split color="outline-dark" size="sm">
                        <FaPlus />&nbsp;Import & Reload
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem>Import Excel File</CDropdownItem>
                        <CDropdownItem>Bulk Edit</CDropdownItem>
                        <CDropdownItem>Reload Saved Routes</CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem>Try us with demo addresses</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    <div className="mt-2">
                      <AddressForm />
                      <AddressForm />
                      <AddressForm />
                    </div>
                  </CTabPane>
                  <CTabPane>

                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>Route</CCardHeader>
            <CCardBody>
              <GoogleMapsComponent
                key="map"
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ReactGoogleMaps;
