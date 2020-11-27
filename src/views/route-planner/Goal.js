import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CForm,
  CFormGroup,
  CBadge,
  CLabel,
  CInputRadio,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { BsDash } from "react-icons/bs";
import "./Goal.scss";

function Goal(props) {
  const [accordion, setAccordion] = useState(0);

  return (
    <CRow className="goal h-100">
      <CCol xl="12">
        <div id="accordion">
          <CCard className="mb-0">
            <CCardHeader id="headingOne">
              <CButton
                block
                color="link"
                className="text-left m-0 p-0"
                onClick={() => setAccordion(accordion === 0 ? null : 0)}
              >
                <h5 className="m-0 p-0">General</h5>
              </CButton>
            </CCardHeader>
            <CCollapse show={accordion === 0}>
              <CCardBody>
                <CForm action="" method="post" className="form-horizontal">
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Departure time is&nbsp;
                        <CBadge color="secondary">9:00</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Service time is&nbsp;
                        <CBadge color="secondary">0 minutes</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Lunch break is&nbsp;
                        <CBadge color="secondary">Not set</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCollapse>
          </CCard>
          <CCard className="mb-0">
            <CCardHeader id="headingTwo">
              <CButton
                block
                color="link"
                className="text-left m-0 p-0"
                onClick={() => setAccordion(accordion === 1 ? null : 1)}
              >
                <h5 className="m-0 p-0">Multi Routing</h5>
              </CButton>
            </CCardHeader>
            <CCollapse show={accordion === 1}>
              <CCardBody>
                <CForm action="" method="post" className="form-horizontal">
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Number of routes is set to&nbsp;
                        <CBadge color="secondary">Calculate Best</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Max routes duration is&nbsp;
                        <CBadge color="secondary">Not set</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Max stops is&nbsp;
                        <CBadge color="secondary">Not set</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Deviation is&nbsp;
                        <CBadge color="secondary">Not set</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Vehicle order-size capacity is&nbsp;
                        <CBadge color="secondary">Not set</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCollapse>
          </CCard>
          <CCard className="mb-0">
            <CCardHeader id="headingThree">
              <CButton
                block
                color="link"
                className="text-left m-0 p-0"
                onClick={() => setAccordion(accordion === 2 ? null : 2)}
              >
                <h5 className="m-0 p-0">Optimization</h5>
              </CButton>
            </CCardHeader>
            <CCollapse show={accordion === 2}>
              <CCardBody>
                <CForm action="" method="post" className="form-horizontal">
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Routes are optimized by&nbsp;
                        <CBadge color="secondary">Minimum distance</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Territories are&nbsp;
                        <CBadge color="secondary">Mixed</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Route departure is set to&nbsp;
                        <CBadge color="secondary">Nearest First</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <h6>
                        <BsDash />
                        &nbsp;Multi-day (overnight stay) is&nbsp;
                        <CBadge color="secondary">Not set</CBadge>
                      </h6>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCollapse>
          </CCard>
          <CCard className="mb-0">
            <CCardHeader id="headingThree">
              <CButton
                block
                color="link"
                className="text-left m-0 p-0"
                onClick={() => setAccordion(accordion === 3 ? null : 3)}
              >
                <h5 className="m-0 p-0">Units & preferences</h5>
              </CButton>
            </CCardHeader>
            <CCollapse show={accordion === 3}>
              <CCardBody>
                <CForm action="" method="post" className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <h6>
                        <BsDash />
                        &nbsp;Distance Units&nbsp;
                      </h6>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="checkbox">
                        <CInputRadio
                          className="form-check-input"
                          id="miles"
                          name="distance"
                          value="miles"
                        />
                        <CLabel variant="checkbox" htmlFor="miles">
                          Miles
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox">
                        <CInputRadio
                          className="form-check-input"
                          id="km"
                          name="distance"
                          value="km"
                        />
                        <CLabel variant="checkbox" htmlFor="km">
                          Km
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <h6>
                        <BsDash />
                        &nbsp;Travel Mode:&nbsp;
                      </h6>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="checkbox">
                        <CInputRadio
                          className="form-check-input"
                          id="driving"
                          name="distance"
                          value="driving"
                        />
                        <CLabel variant="checkbox" htmlFor="driving">
                          Driving
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox">
                        <CInputRadio
                          className="form-check-input"
                          id="walking"
                          name="distance"
                          value="walking"
                        />
                        <CLabel variant="checkbox" htmlFor="walking">
                          Walking
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox">
                        <CInputRadio
                          className="form-check-input"
                          id="cycling"
                          name="distance"
                          value="cycling"
                        />
                        <CLabel variant="checkbox" htmlFor="cycling">
                          Cycling
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCollapse>
          </CCard>
        </div>
      </CCol>
    </CRow>
  );
}

export default Goal;
