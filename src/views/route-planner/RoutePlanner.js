import React, { useState } from "react";
import {
  CNavLink,
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
  CSwitch,
  CRow,
  CCol,
} from "@coreui/react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { FaPlus, FaAddressBook, FaRoute } from "react-icons/fa";
import AddressForm from "../forms/address-form";
import Goal from "./Goal";
import "@annotationhub/react-golden-layout/dist/css/goldenlayout-base.css";
import "@annotationhub/react-golden-layout/dist/css/themes/goldenlayout-light-theme.css";
import { GoldenLayoutComponent } from "@annotationhub/react-golden-layout";
import "./RoutePlanner.scss";

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

function Configuration() {
  const [active, setActive] = useState(0);
  const [endAddress, setEndAddress] = useState(false);

  const toggleEndAddress = () => {
    setEndAddress(!endAddress);
  };

  return (
    <CTabs
      activeTab={active}
      color="dark"
      onActiveTabChange={(idx) => setActive(idx)}
    >
      <CNav variant="tabs">
        <CDropdown inNav>
          <CNavLink className="p-0">
            <CDropdownToggle className="border-0" caret>
              <FaPlus />
              &nbsp;Import & Reload
            </CDropdownToggle>
          </CNavLink>
          <CDropdownMenu>
            <CDropdownItem>Import Excel File</CDropdownItem>
            <CDropdownItem>Bulk Edit</CDropdownItem>
            <CDropdownItem>Reload Saved Routes</CDropdownItem>
            <CDropdownItem>Try us with demo addresses</CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem>Add new stop</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CNavItem>
          <CNavLink>
            <FaAddressBook />
            &nbsp;Address
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>
            <FaRoute />
            &nbsp;Routes
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane>
          <div className="mt-2 address-forms container-fluid">
            <AddressForm withLabel={true} index="H" />
            <CRow>
              <CCol xs="12" md="12">
                <div class="d-flex set-end-address mb-2">
                  <CSwitch
                    className="mx-1"
                    color="primary"
                    labelOn={"\u2713"}
                    labelOff={"\u2715"}
                    size="sm"
                    checked={endAddress}
                    onClick={toggleEndAddress}
                  />
                  <span className="ml-2">Set End Address or Return Route</span>
                </div>
              </CCol>
            </CRow>
            {endAddress && <AddressForm withLabel={false} index="E" />}
            {new Array(100).fill().map((_, i) => {
              return <AddressForm withLabel={i === 0} index={i + 1} />;
            })}
          </div>
        </CTabPane>
        <CTabPane>
          <Goal />
        </CTabPane>
      </CTabContent>
    </CTabs>
  );
}

function MapComponent() {
  return (
    <GoogleMapsComponent
      key="map"
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
      loadingElement={<div className="h-100" />}
      containerElement={<div className="h-100" />}
      mapElement={<div className="h-100" />}
    />
  );
}

const ReactGoogleMaps = () => {
  const [layoutManager, setLayoutManager] = useState(null);

  return (
    <>
      <div className="route-planner-layout">
        <GoldenLayoutComponent
          config={{
            content: [
              {
                type: "row",
                content: [
                  {
                    component: Configuration,
                    title: "Planner",
                    isClosable: false,
                  },
                  {
                    type: "column",
                    content: [
                      {
                        component: MapComponent,
                        title: "Route",
                        isClosable: false,
                      },
                    ],
                  },
                ],
              },
            ],
            settings: {
              showPopoutIcon: false,
              showMaximiseIcon: false,
              showCloseIcon: false,
            },
          }}
          autoresize={true}
          debounceResize={10}
          onLayoutReady={setLayoutManager}
        />
      </div>
    </>
  );
};

export default ReactGoogleMaps;
