import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CNavLink, 
CForm, CFormLabel, CFormInput, CFormFeedback, CInputGroup, CInputGroupText,CButton } from '@coreui/react'
import { createDocument } from '../firebase/crud'
import { useAuth } from '../contexts/authContext'
import { useNavigate, Navigate } from 'react-router-dom'


const Create = () => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const {currentUser} = useAuth();
  console.log(currentUser)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
    }else{
      setIsCreating(true)
      const formData = new FormData(form);  // Create FormData from the form element
      const formValues = Object.fromEntries(formData.entries());
      const result = await createDocument("deliveries", {
        uid: currentUser.uid, earning: formValues.delivery*formValues.rate, ...formValues
      });
      if(result.success) {
        console.log(result);
        setIsCreating(false)
        navigate('/items')
      }else{
        setIsCreating(false)
        console.error(result)
      }
    }
  }
  
  
  
  return (
    <>
      <CCard className="">
        <CCardHeader>
          Create Page
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={4}>
                <CFormLabel htmlFor="validationCustom01">Delivery Count</CFormLabel>
                <CFormInput disabled={isCreating} type="number" name="delivery" id="validationCustom01" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
                <CFormFeedback invalid>Error occurs!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom03">Date</CFormLabel>
                <CFormInput name="date" type="date" id="validationCustom03" disabled={isCreating}
                defaultValue={new Date().toJSON().slice(0, 10)} required/>
                <CFormFeedback invalid>Please provide a valid date.</CFormFeedback>
                <CFormFeedback valid>Looks good!.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom04">Rate</CFormLabel>
                <CFormInput name="rate" type="number" id="validationCustom04" disabled={isCreating}
                defaultValue={30} required/>
                <CFormFeedback invalid>Please provide a rate.</CFormFeedback>
                <CFormFeedback valid>Looks good!.</CFormFeedback>
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit" disabled={isCreating}>
                  Submit form
                </CButton>
              </CCol>
            </CForm>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Create
