import React from "react";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormGroup,
  CLabel,
  CInput,
  CCol,
  CButton,
  CInputRadio,
} from "@coreui/react";

function LunchBreakModal(props) {
  const { open, setOpen } = props;
  return (
    <CModal show={open} onClose={() => setOpen(!open)} size="xs">
      <CModalHeader closeButton>
        <CModalTitle>Lunch Break</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup row className="my-0">
          <CCol xs="12">
            <CLabel className="mb-3">
              Set the time frame and duration for your lunch break.
            </CLabel>
            <CFormGroup row>
              <CCol md="12">
                <CFormGroup variant="checkbox">
                  <CInputRadio
                    className="form-check-input"
                    id="radio1"
                    name="radios"
                    value="option1"
                  />
                  <CLabel variant="checkbox" htmlFor="radio1">
                    Not Set
                  </CLabel>
                </CFormGroup>
                <CFormGroup
                  variant="checkbox"
                  className="d-flex align-items-center"
                >
                  <CInputRadio
                    className="my-auto"
                    id="radio2"
                    name="radios"
                    value="option2"
                  />
                  <div className="d-flex align-items-center">
                    <CLabel htmlFor="startHour" className="mb-0">
                      between&nbsp;&nbsp;
                    </CLabel>
                    <CInput id="startHour" className="w-25" />
                    <CLabel className="mb-0" htmlFor="endHour">
                      &nbsp;&nbsp;and&nbsp;&nbsp;
                    </CLabel>
                    <CInput id="endHour" className="w-25" />
                    <CLabel className="mb-0">
                      &nbsp;&nbsp;for&nbsp;&nbsp;
                    </CLabel>
                    <CInput id="minute" className="w-25" />
                  </div>
                </CFormGroup>
              </CCol>
            </CFormGroup>
          </CCol>
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => setOpen(!open)}>
          Save
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setOpen(!open)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default LunchBreakModal;
