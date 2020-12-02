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
  CCol,
  CCard,
  CCardBody,
  CDataTable,
  CCollapse,
  CButton,
  CBadge,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormGroup,
  CLabel,
  CInput,
  CInputCheckbox,
} from "@coreui/react";
import { FaPlus, FaAddressBook, FaRoute } from "react-icons/fa";
import AddressForm from "../../forms/address-form";
import Goal from "../goal";
import "./configuration.scss";

const usersData = [
  {
    no: 1,
    title: "Samppa Nori",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 2,
    title: "Estavan Lykos",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 3,
    title: "Chetan Mohamed",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 4,
    title: "Derick Maximinus",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 5,
    title: "Friderik Dávid",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 6,
    title: "Yiorgos Avraamu",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 7,
    title: "Avram Tarasios",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 8,
    title: "Quintin Ed",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 9,
    title: "Enéas Kwadwo",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 10,
    title: "Agapetus Tadeáš",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 11,
    title: "Carwyn Fachtna",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
  {
    no: 12,
    title: "Nehemiah Tatius",
    address: "28 Abel Place, Media PA United States",
    serviceTime: "",
    orderSize: "",
  },
];

function Configuration() {
  const [active, setActive] = useState(0);
  const [endAddress, setEndAddress] = useState(false);
  const [stopOpen, setStopOpen] = useState(false);

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
    "no",
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
    <>
      <CCard className="h-100 shadow-sm">
        <CCardBody>
          <CTabs
            activeTab={active}
            color="dark"
            className="border"
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
            <CTabContent className="configuration-content pt-4">
              <CTabPane>
                <CCard className="mx-4 shadow">
                  <CCardBody>
                    <div className="address-forms container-fluid">
                      <AddressForm withLabel={true} index="H" />
                      <CFormGroup row className="mb-2">
                        <CCol md="12">
                          <CFormGroup
                            variant="custom-checkbox"
                            className="pl-n1"
                            inline
                          >
                            <CInputCheckbox
                              custom
                              className="mr-3"
                              id="set-endaddress"
                              name="set-endaddress"
                              value="end-address"
                              onChange={toggleEndAddress}
                            />
                            <CLabel
                              className="pl-2"
                              variant="custom-checkbox"
                              htmlFor="set-endaddress"
                            >
                              Set End Address or Return Route
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>
                      {endAddress && (
                        <AddressForm withLabel={false} index="E" />
                      )}
                    </div>
                  </CCardBody>
                </CCard>
                <CCard className="mx-4 address-table-card shadow">
                  <CCardBody className="data-table">
                    <CDataTable
                      items={usersData}
                      fields={fields}
                      tableFilter
                      itemsPerPage={5}
                      itemsPerPageSelect
                      hover
                      sorter
                      pagination
                      scopedSlots={{
                        no: (item, index) => {
                          return (
                            <td classname="py-2 d-flex">
                              <CBadge className="mx-auto" color="primary">
                                {item.no}
                              </CBadge>
                            </td>
                          );
                        },
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
                                <CButton
                                  size="sm"
                                  color="primary"
                                  onClick={() => {
                                    setStopOpen(true);
                                  }}
                                >
                                  Edit Stop
                                </CButton>
                                <CButton
                                  size="sm"
                                  color="danger"
                                  className="ml-1"
                                >
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
              <CTabPane className="h-100">
                <div className="d-flex flex-column px-3 h-100">
                  <div className="my-auto">
                    <p className="mb-3">
                      Welcome to our <b>Multiple Stop Route Planner</b>. A route
                      mapping software to find the best route and navigate with
                      driving directions
                    </p>
                    <p className="mb-0">
                      1. Insert addresses, using house number, street, city,
                      state and zip code.
                    </p>
                    <p className="mb-0">
                      2. Click 'Set Goals' to include features like service time
                      or multi-routing.
                    </p>
                    <p className="mb-0">
                      3. Click 'Plan My Route' to create the best multi-stop
                      route.
                    </p>
                    <p>4. Navigate with MyRoute app</p>
                  </div>
                </div>
              </CTabPane>
            </CTabContent>
          </CTabs>
          <CModal
            show={stopOpen}
            onClose={() => setStopOpen(!stopOpen)}
            size="lg"
          >
            <CModalHeader closeButton>
              <CModalTitle>Edit Stop</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormGroup>
                <CLabel htmlFor="title">Title</CLabel>
                <CInput id="title" placeholder="Enter your stop title" />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="address">Address</CLabel>
                <CInput id="address" />
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="order-size">Order Size</CLabel>
                    <CInput
                      id="order-size"
                      placeholder="Enter your order size"
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="service-time">Service Time</CLabel>
                    <CInput
                      id="service-time"
                      placeholder="Enter your service time"
                    />
                  </CFormGroup>
                </CCol>
              </CFormGroup>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={() => setStopOpen(!stopOpen)}>
                Save
              </CButton>{" "}
              <CButton color="secondary" onClick={() => setStopOpen(!stopOpen)}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>
    </>
  );
}

export default Configuration;
