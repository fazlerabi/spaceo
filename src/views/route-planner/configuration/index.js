import React, { useState, useRef, useEffect } from "react";
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
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as XLSX from "xlsx";
import { FaPlus, FaAddressBook, FaRoute } from "react-icons/fa";
import AddressForm from "../../forms/address-form";
import ImportDocumentModal from "../import-document";
import Goal from "../goal";
import { validateAddress } from "../../../utils/index";
import "./configuration.scss";

function Configuration() {
  const [progress, setProgress] = useState(0);
  const [percent, setPercent] = useState(0);
  const [active, setActive] = useState(0);
  const [endAddress, setEndAddress] = useState(false);
  const [stopOpen, setStopOpen] = useState(false);
  const [workspace, setWorkspace] = useState(null);
  const [importDocumentOpen, setImportDocumentOpen] = useState(false);
  const [progressBarOpen, setProgressBarOpen] = useState(false);
  const [addressLength, setAddressLength] = useState(0);
  const [importedAddresses, setImportedAddresses] = useState([]);
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  const increment = () => {
    setProgress(Math.random());
  };

  const toggleEndAddress = () => {
    setEndAddress(!endAddress);
  };

  const fileHandler = (event) => {
    const fileObj = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      setWorkspace(wb);
      setFileName(fileObj.name);
      setImportDocumentOpen(true);
    };
    reader.readAsBinaryString(fileObj);
  };

  useEffect(() => {
    setPercent(percent + 1);
  }, [progress]);

  const setAddress = async (rows) => {
    setProgress(0);
    setAddressLength(rows.length);
    setProgressBarOpen(true);
    const verifiedAddresses = await Promise.all(
      rows.map((row) => validateAddress(row.address, row.type, increment))
    );
    setProgressBarOpen(false);
    setImportedAddresses(
      verifiedAddresses.map((row) => {
        const key = Object.keys(row)[0];
        const value = row[key];

        const relatedAddress = rows.filter((a) => a.type == key)[0];

        return { verified: value, ...relatedAddress };
      })
    );
  };

  const cancelImport = () => {
    setProgressBarOpen(false);
  };

  const importExcelFile = () => {
    inputRef.current.click();
  };

  const fields = [
    "type",
    { key: "title", _style: { width: "20%" } },
    "address",
    { key: "service_time", _style: { width: "10%" } },
    { key: "order_size", _style: { width: "10%" } },
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
      <input
        type="file"
        onChange={fileHandler}
        className="d-none"
        ref={inputRef}
      />
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
                  <CDropdownItem onClick={importExcelFile}>
                    Import Excel File
                  </CDropdownItem>
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
            <CTabContent className="configuration-content">
              <CTabPane>
                <CCard className="mt-3 mx-3 shadow">
                  <CCardBody>
                    <div className="address-forms container-fluid">
                      <AddressForm withLabel={true} index="H" />
                      <CFormGroup row className="mb-2">
                        <CCol md="1"></CCol>
                        <CCol md="9" className="px-0">
                          <CFormGroup variant="custom-checkbox" inline>
                            <CInputCheckbox
                              custom
                              className="mr-3"
                              id="set-endaddress"
                              name="set-endaddress"
                              value="end-address"
                              onChange={toggleEndAddress}
                            />
                            <CLabel
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
                <CCard className="mx-3 address-table-card shadow">
                  <CCardBody className="data-table">
                    <CDataTable
                      items={importedAddresses}
                      fields={fields}
                      tableFilter
                      itemsPerPage={10}
                      itemsPerPageSelect={{
                        label: "Addresses per page: ",
                        values: [10, 20, 50],
                      }}
                      hover
                      sorter
                      pagination
                      onRowClick={() => {
                        setStopOpen(!stopOpen);
                      }}
                      scopedSlots={{
                        no: (item) => {
                          return (
                            <td className="py-2 d-flex">
                              <CBadge className="mx-auto" color="primary">
                                {item.no || ""}
                              </CBadge>
                            </td>
                          );
                        },
                        address: (item) => {
                          return (
                            <td className={item.verified ? "verified" : ""}>
                              {item.address || ""}
                            </td>
                          );
                        },
                        title: (item) => {
                          return <td>{item.title || ""}</td>;
                        },
                        service_time: (item) => {
                          return <td>{item.service_time || ""}</td>;
                        },
                        order_size: (item) => {
                          return <td>{item.order_size || ""}</td>;
                        },
                        show_details: (item, index) => {
                          return (
                            <td className="py-2">
                              <CButton
                                size="sm"
                                color="primary"
                                onClick={() => {
                                  setStopOpen(true);
                                }}
                              >
                                <CIcon name="cil-pencil" />
                              </CButton>
                              <CButton
                                size="sm"
                                color="danger"
                                className="ml-1"
                              >
                                <CIcon name="cil-trash" />
                              </CButton>
                            </td>
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
      <CModal
        show={progressBarOpen}
        onClose={() => setProgressBarOpen(false)}
        size="md"
      >
        <CModalHeader closeButton>
          <CModalTitle>Processing...</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CProgress
            color="primary"
            value={addressLength === 0 ? 0 : (percent / addressLength) * 100}
            showValue
            className="mb-1 bg-white"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={cancelImport}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
      <ImportDocumentModal
        open={importDocumentOpen}
        setOpen={setImportDocumentOpen}
        setAddress={setAddress}
        wb={workspace}
        fileName={fileName}
      />
    </>
  );
}

export default Configuration;
