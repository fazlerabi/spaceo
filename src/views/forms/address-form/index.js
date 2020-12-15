import React from "react";
import {
  CCol,
  CForm,
  CInvalidFeedback,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
  CBadge,
} from "@coreui/react";

import { Formik } from "formik";
import * as Yup from "yup";
import "./address-form.scss";

const validationSchema = function (values) {
  return Yup.object().shape({
    address: Yup.string().required("Required"),
  });
};

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
};

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 2000);
};

const AddressForm = (props) => {
  const { withLabel, index, value } = props;

  const initialValues = {
    title: value.title || "",
    address: value.address || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate(validationSchema)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <CForm
          className="address-form"
          onSubmit={handleSubmit}
          noValidate
          name="simpleForm"
        >
          <CRow>
            <CCol xs="1" className="px-1">
              <div className={withLabel ? "home-label" : "stop-label"}>
                <CBadge color="primary" size="lg" className="mx-auto">
                  {index}
                </CBadge>
              </div>
            </CCol>
            <CCol xs="2" className="pl-0 pr-1">
              <CFormGroup className="mb-2">
                {withLabel && <CLabel htmlFor="title">Title</CLabel>}
                <CInput
                  type="text"
                  name="title"
                  autoComplete="title"
                  invalid={touched.title && !!errors.title}
                  autoFocus={true}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <CInvalidFeedback>{errors.title}</CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol xs="5" className="px-1">
              <CFormGroup className="mb-2">
                {withLabel && <CLabel htmlFor="address">Address</CLabel>}
                <CInput
                  type="text"
                  name="address"
                  autoComplete="address"
                  invalid={touched.address && !!errors.address}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                <CInvalidFeedback>{errors.address}</CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol xs="2" className="px-1">
              <CFormGroup className="mb-2">
                {withLabel && (
                  <CLabel htmlFor="serviceTime">Service Time</CLabel>
                )}
                <CInput
                  type="text"
                  name="serviceTime"
                  autoComplete="serviceTime"
                  invalid={touched.serviceTime && !!errors.serviceTime}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.serviceTime}
                />
                <CInvalidFeedback>{errors.serviceTime}</CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol xs="2" className="px-1">
              <CFormGroup className="mb-2">
                {withLabel && <CLabel htmlFor="orderSize">Order Size</CLabel>}
                <CInput
                  type="text"
                  name="orderSize"
                  autoComplete="orderSize"
                  invalid={touched.orderSize && !!errors.orderSize}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.orderSize}
                />
                <CInvalidFeedback>{errors.orderSize}</CInvalidFeedback>
              </CFormGroup>
            </CCol>
          </CRow>
        </CForm>
      )}
    </Formik>
  );
};

export default AddressForm;
