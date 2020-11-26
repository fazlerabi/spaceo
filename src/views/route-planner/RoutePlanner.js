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
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { FaPlus, FaAddressBook, FaRoute } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import AddressForm from "../forms/address-form";
import Goal from "./Goal";

const apiKey = "AIzaSyCB5ELK-MyT_h_XUxkLz8gVlEIlloseKyo";

const defaultZoom = 11;
const defaultCenter = { lat: 37.431489, lng: -122.163719 };

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

const ReactGoogleMaps = () => {
  const [active, setActive] = useState(0);

  return (
    <>
      <CRow>
        <CCol xs="12" md="4">
          <CCard>
            <CCardBody>
              <CTabs
                activeTab={active}
                color="dark"
                onActiveTabChange={(idx) => setActive(idx)}
              >
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                      <FaAddressBook />
                      {active === 0 && " Address"}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      <AiOutlineSetting />
                      {active === 1 && " Goals"}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      <FaRoute />
                      {active === 2 && " Routes"}
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <CDropdown className="mt-4">
                      <CDropdownToggle split color="outline-dark" size="sm">
                        <FaPlus />
                        &nbsp;Import & Reload
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem>Import Excel File</CDropdownItem>
                        <CDropdownItem>Bulk Edit</CDropdownItem>
                        <CDropdownItem>Reload Saved Routes</CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem>
                          Try us with demo addresses
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    <div className="mt-2 address-forms container-fluid">
                      {new Array(100).fill().map((_, i) => {
                        return <AddressForm withLabel={i === 0} index={i} />;
                      })}
                    </div>
                  </CTabPane>
                  <CTabPane>
                    <Goal />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" md="8">
          <CCard className="h-100">
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
        </CCol>
      </CRow>
    </>
  );
};

export default ReactGoogleMaps;
