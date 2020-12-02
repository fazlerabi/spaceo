import React, { useState, useReducer, useRef } from "react";
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
  CPopover,
  CLink,
  CInput,
  CCardFooter,
} from "@coreui/react";
import { BsDash } from "react-icons/bs";
import "./goal.scss";

const initialState = {
  general: true,
  multiRouting: true,
  optimization: true,
  preferences: true,
};

function reducer(state, action) {
  switch (action.key) {
    case "general":
      return { ...state, general: !state.general };
    case "multiRouting":
      return { ...state, multiRouting: !state.multiRouting };
    case "optimization":
      return { ...state, optimization: !state.optimization };
    case "preferences":
      return { ...state, preferences: !state.preferences };
    default:
      throw new Error();
  }
}

function Goal(props) {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const clickSave = () => {
    console.log("here------");
    document.body.click();
  };

  return (
    <>
      <CRow className="goal h-100">
        <CCol className="h-100" xl="12">
          <div className="p-3">
            <CCard className="shadow">
              <CCardHeader id="headingOne">
                <CButton
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => dispatch({ key: "general" })}
                >
                  <h5 className="m-0 p-0">General</h5>
                </CButton>
              </CCardHeader>
              <CCollapse show={state.general}>
                <CCardBody>
                  <CForm action="" method="post" className="form-horizontal">
                    <CFormGroup row>
                      <CCol xs="12" md="12">
                        <h6>
                          <BsDash />
                          &nbsp;Departure time is&nbsp;
                          <CPopover
                            boundary="scrollParent"
                            content={
                              <CCard className="m-0">
                                <CCardHeader>
                                  <span className="h5">Departure time</span>
                                </CCardHeader>
                                <CCardBody>
                                  <CFormGroup row className="my-0">
                                    <CCol xs="12">
                                      <CFormGroup className="mb-0">
                                        <CLabel className="mb-2">
                                          Set your preferred time to start your
                                          route (24h value, e.g. 13:30).
                                        </CLabel>
                                        <div className="d-flex align-items-center">
                                          <CLabel
                                            htmlFor="departure-time"
                                            className="mb-0"
                                          >
                                            Departure time:&nbsp;&nbsp;
                                          </CLabel>
                                          <CInput
                                            id="departure-time"
                                            className="w-50"
                                          />
                                        </div>
                                      </CFormGroup>
                                    </CCol>
                                  </CFormGroup>
                                </CCardBody>
                                <CCardFooter>
                                  <button
                                    class="btn btn-primary"
                                    onClick="function() {console.log('test');}"
                                  >
                                    Save
                                  </button>{" "}
                                  <CButton color="secondary">Cancel</CButton>
                                </CCardFooter>
                              </CCard>
                            }
                            interactive={true}
                            trigger="click"
                          >
                            <CBadge color="secondary">9:00</CBadge>
                          </CPopover>
                        </h6>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol xs="12" md="12">
                        <h6>
                          <BsDash />
                          &nbsp;Service time is&nbsp;
                          <CPopover
                            header="Popover header"
                            content={`Popover with placement`}
                            interactive={true}
                            trigger="click"
                          >
                            <CBadge color="secondary">0 minutes</CBadge>
                          </CPopover>
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
            <CCard className="shadow">
              <CCardHeader id="headingTwo">
                <CButton
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => dispatch({ key: "multiRouting" })}
                >
                  <h5 className="m-0 p-0">Multi Routing</h5>
                </CButton>
              </CCardHeader>
              <CCollapse show={state.multiRouting}>
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
            <CCard className="shadow">
              <CCardHeader id="headingThree">
                <CButton
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => dispatch({ key: "optimization" })}
                >
                  <h5 className="m-0 p-0">Optimization</h5>
                </CButton>
              </CCardHeader>
              <CCollapse show={state.optimization}>
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
            <CCard className="shadow">
              <CCardHeader id="headingThree">
                <CButton
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => dispatch({ key: "preferences" })}
                >
                  <h5 className="m-0 p-0">Units & preferences</h5>
                </CButton>
              </CCardHeader>
              <CCollapse show={state.preferences}>
                <CCardBody>
                  <CForm
                    action=""
                    method="post"
                    className="form-horizontal preferences"
                  >
                    <div className="d-flex w-100">
                      <h6>
                        <BsDash />
                        &nbsp;Distance Units:
                      </h6>
                      <CFormGroup row className="flex-fill">
                        <div className="col-inputradio">
                          <CFormGroup variant="checkbox" className="mr-2">
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
                        </div>
                        <div className="col-inputradio">
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
                        </div>
                      </CFormGroup>
                    </div>
                    <div className="d-flex x-100">
                      <h6>
                        <BsDash />
                        &nbsp;Travel Mode:
                      </h6>
                      <CFormGroup row className="flex-fill">
                        <div className="col-inputradio">
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
                        </div>
                        <div className="col-inputradio">
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
                        </div>
                        <div className="col-inputradio">
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
                        </div>
                      </CFormGroup>
                    </div>
                  </CForm>
                </CCardBody>
              </CCollapse>
            </CCard>
          </div>
        </CCol>
      </CRow>
    </>
  );
}

export default Goal;
