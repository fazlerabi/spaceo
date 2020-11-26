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
import { FaLongArrowAltDown } from "react-icons/fa";
import "./address-form.scss";

const validationSchema = function (values) {
  return Yup.object().shape({
    title: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    serviceTime: Yup.string().required("Required"),
    orderSize: Yup.string().required("Required"),
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

const AddressForm = (props) => {
  const { withLabel, index } = props;
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
            <CCol xs="1" className="px-1">
              <div className={index === 0 ? "home-label" : "stop-label"}>
                <span>{index === 0 ? "H" : index}</span>
                <FaLongArrowAltDown className="down-arrow" />
              </div>
            </CCol>
            <CCol xs="2" className="px-1">
              <CFormGroup className="mb-2">
                {withLabel && <CLabel htmlFor="title">Title</CLabel>}
                <CInput
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
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
            <CCol xs="4" className="px-1">
              <CFormGroup className="mb-2">
                {withLabel && <CLabel htmlFor="address">Address</CLabel>}
                <CInput
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
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
            <CCol xs="3" className="px-1">
              <CFormGroup className="mb-2">
                {withLabel && (
                  <CLabel htmlFor="serviceTime">Service Time</CLabel>
                )}
                <CInput
                  type="text"
                  name="serviceTime"
                  id="serviceTime"
                  placeholder="Service Time"
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
                  id="orderSize"
                  placeHolder="Size"
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
