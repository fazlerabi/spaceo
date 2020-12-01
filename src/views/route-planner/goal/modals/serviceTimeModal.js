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

function ServiceTimeModal(props) {
  const { open, setOpen } = props;
  return (
    <CModal show={open} onClose={() => setOpen(!open)} size="xs">
      <CModalHeader closeButton>
        <CModalTitle>Service Time</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup row className="my-0">
          <CCol xs="12">
            <CFormGroup>
              <CLabel className="mb-3">
                Set the time you need to spend at each stop.
              </CLabel>
              <div className="d-flex align-items-center">
                <CLabel htmlFor="service-time" className="mb-0">
                  Service time is&nbsp;&nbsp;
                </CLabel>
                <CInput id="service-time" className="w-25" />
                <CLabel className="mb-0">&nbsp;&nbsp;minutes</CLabel>
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

export default ServiceTimeModal;
