import React from "react";
import {
  CCol,
  CForm,
  CInvalidFeedback,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
} from "@coreui/react";

import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = function (values) {
  return Yup.object().shape({
    title: Yup.string()
      .min(2, `Title has to be at least 2 characters`)
      .required("Title is required"),
    address: Yup.string()
      .min(1, `Address has to be at least 1 character`)
      .required("Address is required"),
    serviceTime: Yup.string()
      .min(1, `Service Time has to be at least 1 character`)
      .required("Service Time is required"),
    orderSize: Yup.string()
      .min(1, `Order Size has to be at least 1 character`)
      .required("Order Size is required"),
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

const initialValues = {
  title: "",
  address: "",
};

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    // console.log('User has been successfully saved!', values)
    setSubmitting(false);
  }, 2000);
};

const findFirstError = (formName, hasError) => {
  const form = document.forms[formName];
  for (let i = 0; i < form.length; i++) {
    if (hasError(form[i].name)) {
      form[i].focus();
      break;
    }
  }
};

const validateForm = (errors) => {
  findFirstError("simpleForm", (fieldName) => {
    return Boolean(errors[fieldName]);
  });
};

const AddressForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate(validationSchema)}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <CForm onSubmit={handleSubmit} noValidate name="simpleForm">
          <CRow>
            <CCol lg="4">
              <CFormGroup className="mb-2">
                <CLabel htmlFor="title">Title</CLabel>
                <CInput
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  autoComplete="title"
                  valid={!errors.title}
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
            <CCol lg="4">
              <CFormGroup className="mb-2">
                <CLabel htmlFor="address">Address</CLabel>
                <CInput
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  autoComplete="address"
                  valid={!errors.address}
                  invalid={touched.address && !!errors.address}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                <CInvalidFeedback>{errors.address}</CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol lg="2">
              <CFormGroup className="mb-2">
                <CLabel htmlFor="serviceTime">Service Time</CLabel>
                <CInput
                  type="text"
                  name="serviceTime"
                  id="serviceTime"
                  placeholder="Service Time"
                  autoComplete="serviceTime"
                  valid={!errors.serviceTime}
                  invalid={touched.serviceTime && !!errors.serviceTime}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.serviceTime}
                />
                <CInvalidFeedback>{errors.serviceTime}</CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol lg="2">
              <CFormGroup className="mb-2">
                <CLabel htmlFor="orderSize">Order Size</CLabel>
                <CInput
                  type="text"
                  name="orderSize"
                  id="orderSize"
                  placeholder="Order Size"
                  autoComplete="orderSize"
                  valid={!errors.orderSize}
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
