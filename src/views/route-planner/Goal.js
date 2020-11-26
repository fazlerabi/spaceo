import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CForm,
  CFormGroup,
  CInput,
  CFormText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import "./Goal.scss";

function Goal(props) {
  const [accordion, setAccordion] = useState(1);

  return (
    <CRow className="goal">
      <CCol xl="12" style={{ minHeight: 800 }}>
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
                      <CInput
                        type="email"
                        id="hf-email"
                        name="hf-email"
                        placeholder="Please enter your departure time"
                        autoComplete="email"
                      />
                      <CFormText className="help-block">
                        Set your preferred time to start your route (24h value,
                        e.g. 13:30)
                      </CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <CInput
                        type="password"
                        id="hf-password"
                        name="hf-password"
                        placeholder="Please enter your service time"
                        autoComplete="current-password"
                      />
                      <CFormText className="help-block">
                        Set the time you need to spend at each stop (in minutes)
                      </CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="12">
                      <div className="d-flex lunch-break">
                        <span>Between&nbsp;</span>
                        <CInput
                          type="password"
                          id="hf-password"
                          name="hf-password"
                          autoComplete="current-password"
                        />
                        <span>&nbsp;and&nbsp;</span>
                        <CInput
                          type="password"
                          id="hf-password"
                          name="hf-password"
                          autoComplete="current-password"
                        />
                        <span>&nbsp;for&nbsp;</span>
                        <CInput
                          type="password"
                          id="hf-password"
                          name="hf-password"
                          autoComplete="current-password"
                        />
                        <span>&nbsp;minutes</span>
                      </div>

                      <CFormText className="help-block">
                        Set the time frame and duration for your lunch break
                      </CFormText>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="sm" color="primary">
                  <CIcon name="cil-scrubber" /> Save
                </CButton>{" "}
                <CButton type="reset" size="sm" color="danger">
                  <CIcon name="cil-ban" /> Reset
                </CButton>
              </CCardFooter>
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
                2. Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven''t heard of them accusamus labore sustainable VHS.
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
                3. Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                havent heard of them accusamus labore sustainable VHS.
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
                <h5 className="m-0 p-0">Units & preferences</h5>
              </CButton>
            </CCardHeader>
            <CCollapse show={accordion === 2}>
              <CCardBody>
                3. Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                havent heard of them accusamus labore sustainable VHS.
              </CCardBody>
            </CCollapse>
          </CCard>
        </div>
      </CCol>
    </CRow>
  );
}

export default Goal;
