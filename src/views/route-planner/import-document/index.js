import React, { useState } from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CButton,
  CModalFooter,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CSelect,
  CInputCheckbox,
  CCollapse,
} from "@coreui/react";
import { GrDocumentUpload } from "react-icons/gr";
import Dropdown from "./dropdown";
import "./import-document.scss";

function ImportDocument(props) {
  const { open, setOpen, rows = null, sheet = [] } = props;
  const [accordion, setAccordion] = useState(1);

  return (
    <CModal
      className="import-document"
      show={open}
      onClose={() => setOpen(!open)}
      size="xl"
    >
      <CModalHeader closeButton>
        <CModalTitle className="d-flex align-items-center">
          <GrDocumentUpload className="my-auto mr-2 h4" />
          Import Document
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol md="4">
            <CFormGroup>
              <CLabel htmlFor="sheet">Select a sheet</CLabel>
              <CSelect custom name="sheet" id="sheet">
                {sheet.map((s) => {
                  return <option value={s}>{s}</option>;
                })}
              </CSelect>
            </CFormGroup>
          </CCol>
          <CCol
            md="8"
            className="d-flex justify-content-end align-items-center"
          >
            <CFormGroup variant="custom-checkbox" inline>
              <CInputCheckbox
                custom
                id="inline-checkbox2"
                name="inline-checkbox2"
                value="option2"
              />
              <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">
                Ignore first row
              </CLabel>
            </CFormGroup>
            <CFormGroup variant="custom-checkbox" inline>
              <CInputCheckbox
                custom
                id="inline-checkbox3"
                name="inline-checkbox3"
                value="option3"
              />
              <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">
                Append to curent list
              </CLabel>
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md="12" className="d-flex justify-content-end">
            <CFormGroup variant="custom-checkbox" inline>
              <CInputCheckbox
                custom
                id="inline-checkbox3"
                name="inline-checkbox3"
                value="option3"
              />
              <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">
                Set first as start address
              </CLabel>
            </CFormGroup>
            <CFormGroup variant="custom-checkbox" inline>
              <CInputCheckbox
                custom
                id="inline-checkbox3"
                name="inline-checkbox3"
                value="option3"
              />
              <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">
                Set last as end address
              </CLabel>
            </CFormGroup>
            <CFormGroup variant="custom-checkbox" inline>
              <CInputCheckbox
                custom
                id="inline-checkbox3"
                name="inline-checkbox3"
                value="option3"
              />
              <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">
                Return to start address
              </CLabel>
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol>
            <CButton
              block
              color="link"
              className="text-left m-0 p-0"
              onClick={() => setAccordion(accordion === 0 ? null : 0)}
            >
              <h5 className="m-0 p-0">
                Pick the correct option, above each column:
              </h5>
            </CButton>
            <CCollapse show={accordion === 0}>
              <CRow>
                <CCol md="6">
                  Address - House#, Street, City, Zip code, State etc.
                </CCol>
                <CCol md="6">
                  Ignore - Irrelevant info that will be excluded (like fax #).
                </CCol>
              </CRow>
              <CRow>
                <CCol md="6">
                  Title - Customer name, Store name, Notes etc.
                </CCol>
                <CCol md="6">
                  Filter-in/out - Rows with values will be included/excluded.
                </CCol>
              </CRow>
              <CRow>
                <CCol md="6">
                  Territory - Values that define geographical area grouping.
                </CCol>
                <CCol md="6">
                  Comments - Instructions or other information.
                </CCol>
              </CRow>
              <CRow>
                <CCol md="6">
                  Service Time - Pause at a specific location (in minutes).
                </CCol>
              </CRow>
            </CCollapse>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol>
            <table className="table table-bordered">
              <thead>
                <tr>
                  {rows &&
                    rows.length &&
                    Object.keys(rows[0]).map(() => {
                      return (
                        <th scope="col" className="p-0">
                          <Dropdown />
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {rows &&
                    rows.length &&
                    Object.keys(rows[0]).map((cell) => {
                      return <td>{cell}</td>;
                    })}
                </tr>
                {rows.map((row) => {
                  return (
                    <tr>
                      {Object.keys(row).map((cell) => {
                        return <td>{row[cell]}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <p>Review the results preview and select import now.</p>
            <table className="table table-bordered table-light">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th className="th-address" scope="col">
                    Address
                  </th>
                  <th className="th-service-time" scope="col">
                    Service time
                  </th>
                  <th className="th-order-size" scope="col">
                    Order Size
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => setOpen(!open)}>
          Import Now
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setOpen(!open)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default ImportDocument;
