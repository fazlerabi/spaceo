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
} from "@coreui/react";
import "./modal.scss";

function DepartureTimeModal(props) {
  const { open, setOpen } = props;
  return (
    <CModal
      className="goal-modal"
      centered
      show={open}
      onClose={() => setOpen(!open)}
    >
      <CModalHeader closeButton>
        <CModalTitle>Departure Time</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup row className="my-0">
          <CCol xs="12">
            <CFormGroup className="mb-0">
              <CLabel className="mb-2">
                Set your preferred time to start your route (24h value, e.g.
                13:30).
              </CLabel>
              <div className="d-flex align-items-center">
                <CLabel htmlFor="departure-time" className="mb-0">
                  Departure time:&nbsp;&nbsp;
                </CLabel>
                <CInput id="departure-time" className="w-50" />
              </div>
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

export default DepartureTimeModal;
