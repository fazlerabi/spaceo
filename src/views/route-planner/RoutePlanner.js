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
  CCard,
  CCardBody,
  CDataTable,
  CCollapse,
  CButton,
} from "@coreui/react";
import { useSelector } from "react-redux";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { FaPlus, FaAddressBook, FaRoute } from "react-icons/fa";
import { GoldenLayoutComponent } from "@annotationhub/react-golden-layout";
import AddressForm from "../forms/address-form";
import Goal from "./Goal";
import "./RoutePlanner.scss";
import "@annotationhub/react-golden-layout/dist/css/goldenlayout-base.css";
import "@annotationhub/react-golden-layout/dist/css/themes/goldenlayout-light-theme.css";

const apiKey = "AIzaSyCB5ELK-MyT_h_XUxkLz8gVlEIlloseKyo";

const defaultZoom = 11;
const defaultCenter = { lat: 37.431489, lng: -122.163719 };

const usersData = [
  {
    no: 0,
    title: "John Doe",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Guest",
    orderSize: "Pending",
  },
  {
    no: 1,
    title: "Samppa Nori",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Member",
    orderSize: "Active",
  },
  {
    no: 2,
    title: "Estavan Lykos",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Staff",
    orderSize: "Banned",
  },
  {
    no: 3,
    title: "Chetan Mohamed",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Admin",
    orderSize: "Inactive",
  },
  {
    no: 4,
    title: "Derick Maximinus",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Member",
    orderSize: "Pending",
  },
  {
    no: 5,
    title: "Friderik Dávid",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Staff",
    orderSize: "Active",
  },
  {
    no: 6,
    title: "Yiorgos Avraamu",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Member",
    orderSize: "Active",
  },
  {
    no: 7,
    title: "Avram Tarasios",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Staff",
    orderSize: "Banned",
  },
  {
    no: 8,
    title: "Quintin Ed",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Admin",
    orderSize: "Inactive",
  },
  {
    no: 9,
    title: "Enéas Kwadwo",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Member",
    orderSize: "Pending",
  },
  {
    no: 10,
    title: "Agapetus Tadeáš",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Staff",
    orderSize: "Active",
  },
  {
    no: 11,
    title: "Carwyn Fachtna",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Member",
    orderSize: "Active",
  },
  {
    no: 12,
    title: "Nehemiah Tatius",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Staff",
    orderSize: "Banned",
  },
  {
    no: 13,
    title: "Ebbe Gemariah",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Admin",
    orderSize: "Inactive",
  },
  {
    no: 14,
    title: "Eustorgios Amulius",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Member",
    orderSize: "Pending",
  },
  {
    no: 15,
    title: "Leopold Gáspár",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Staff",
    orderSize: "Active",
  },
  {
    no: 16,
    title: "Pompeius René",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Member",
    orderSize: "Active",
  },
  {
    no: 17,
    title: "Paĉjo Jadon",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Staff",
    orderSize: "Banned",
  },
  {
    no: 18,
    title: "Micheal Mercurius",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Admin",
    orderSize: "Inactive",
  },
  {
    no: 19,
    title: "Ganesha Dubhghall",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Member",
    orderSize: "Pending",
  },
  {
    no: 20,
    title: "Hiroto Šimun",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Staff",
    orderSize: "Active",
  },
  {
    no: 21,
    title: "Vishnu Serghei",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Member",
    orderSize: "Active",
  },
  {
    no: 22,
    title: "Zbyněk Phoibos",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Staff",
    orderSize: "Banned",
  },
  {
    no: 23,
    title: "Aulus Agmundr",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Member",
    orderSize: "Pending",
  },
  {
    no: 42,
    title: "Ford Prefect",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "Alien",
    orderSize: "Don't panic!",
  },
];

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

  const [details, setDetails] = useState([]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "title", _style: { width: "20%" } },
    "address",
    { key: "serviceTime", _style: { width: "10%" } },
    { key: "orderSize", _style: { width: "10%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

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
      <CTabContent className="h-100">
        <CTabPane>
          <CCard className="mx-4 mt-4">
            <CCardBody>
              <div className="address-forms container-fluid">
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
                      <span className="ml-2">
                        Set End Address or Return Route
                      </span>
                    </div>
                  </CCol>
                </CRow>
                {endAddress && <AddressForm withLabel={false} index="E" />}
              </div>
            </CCardBody>
          </CCard>
          <CCard className="mx-4">
            <CCardBody>
              <CDataTable
                items={usersData}
                fields={fields}
                columnFilter
                tableFilter
                footer
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                sorter
                pagination
                scopedSlots={{
                  show_details: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}
                        >
                          {details.includes(index) ? "Hide" : "Show"}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <h4>{item.username}</h4>
                          <p className="text-muted">
                            User since: {item.registered}
                          </p>
                          <CButton size="sm" color="info">
                            User Settings
                          </CButton>
                          <CButton size="sm" color="danger" className="ml-1">
                            Delete
                          </CButton>
                        </CCardBody>
                      </CCollapse>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CTabPane>
        <CTabPane className="h-100">
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
  const isDesktop = useSelector((state) => state.isDesktop);
  const [layoutManager, setLayoutManager] = useState(null);

  const mobileLayout = {
    content: [
      {
        type: "stack",
        content: [
          {
            component: Configuration,
            title: "Planner",
            isClosable: false,
          },
          {
            component: MapComponent,
            title: "Route",
            isClosable: false,
          },
        ],
      },
    ],
    settings: {
      showPopoutIcon: false,
      showMaximiseIcon: false,
      showCloseIcon: false,
    },
  };

  const layout = {
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
  };

  return (
    <div className="route-planner-layout">
      <GoldenLayoutComponent
        config={isDesktop ? layout : mobileLayout}
        autoresize={true}
        debounceResize={10}
        onLayoutReady={setLayoutManager}
      />
    </div>
  );
};

export default ReactGoogleMaps;
