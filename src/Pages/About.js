import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
// import { Button } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function AboutPage() {
  const [show, setShow] = useState(false);

  const [notDisabled, setNotDisabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleIsNotDisabled = () => {
    setNotDisabled(true);
    setIsDisabled(false);
  };
  const handleIsDisabled = () => {
    setIsDisabled(true);
    setNotDisabled(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitApplication = async (values) => {
    try {
      setTimeout(() => {
        alert("application submission success");
        console.log(
          values.fullName,
          values.email,
          values.dob,
          values.phoneNumber,
          values.idNumber,
          values.isNotDisAbled,
          values.isDisabled
        );
      }, 500);
    } catch (error) {
      alert("error submitting application form: ", error.message);
    }
  };

  return (
    <div>
      <Button type=" button" onClick={handleShow}>
        Apply Now
      </Button>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Job Application Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                phoneNumber: "",
                dob: "",
                idNumber: "",
                isNotDisAbled: notDisabled,
                isDisabled: isDisabled,
              }}
              onSubmit={handleSubmitApplication}
            >
              {({ values, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <div id="fullName">
                    <label id="displayName">Full Name</label>
                    <Field
                      name="fullName"
                      id="fullName"
                      type="text"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter full names"
                    />
                  </div>
                  <div id="email">
                    <label id="email">Email</label>
                    <Field
                      name="email"
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div id="phoneNumber">
                    <label id="phoneNumber">Phone number</label>
                    <Field
                      name="phoneNumber"
                      id="phoneNumber"
                      type="tel"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div id="dob" className="column">
                    <label id="dob">Date of Birth</label>
                    <Field
                      name="dob"
                      id="dob"
                      type="tel"
                      value={values.dob}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter date of birth"
                    />
                  </div>
                  <div id="idNumber">
                    <label id="idNumber">Date of Birth</label>
                    <Field
                      name="idNumber"
                      id="idNumber"
                      type="number"
                      value={values.idNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter id-card number"
                    />
                  </div>
                  <div id="notDisabled">
                    <label id="notDisabled">Disablities</label>
                    <div>
                      <label id="notDisabled">No</label>
                      <input
                        name="notDisabled"
                        type="checkbox"
                        id="notDisbaled"
                        checked={notDisabled}
                        value={values.isNotDisAbled}
                        onChange={handleIsNotDisabled}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div>
                      <label id="isDisabled">Yes</label>
                      <input
                        name="isDisabled"
                        type="checkbox"
                        id="isDisabled"
                        checked={isDisabled}
                        value={values.isDisabled}
                        onChange={handleIsDisabled}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
