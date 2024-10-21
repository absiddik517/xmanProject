import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CNavLink, 
CForm, CFormLabel, CFormInput, CSpinner, CFormFeedback, CInputGroup, CInputGroupText,CButton } from '@coreui/react'
import { updateDocument, getDocument } from '../firebase/crud'
import { useAuth } from '../contexts/authContext'
import { useNavigate, Navigate, useParams } from 'react-router-dom'


const Create = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [delivery, setDelivery] = useState({})
  const [loading, setLoading] = useState(false)
  const {currentUser} = useAuth();
  useEffect(()=>{
    const getDelivery = async () => {
      setLoading(true)
      const result = await getDocument('deliveries', id);
      if(result.success){
        setDelivery(result.data);
      }
      setLoading(false)
    }
    getDelivery()
  }, [id])
  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
    }else{
      setLoading(true)
      const formData = new FormData(form);  // Create FormData from the form element
      const formValues = Object.fromEntries(formData.entries());
      const result = await updateDocument("deliveries", id, {
        uid: currentUser.uid, earning: formValues.delivery*formValues.rate, ...formValues
      });
      if(result.success) {
        console.log(result);
        setLoading(false)
        navigate('/items')
      }else{
        setLoading(false)
        console.error(result)
      }
    }
  }
  
  
  
  return (
    <>
      <CCard className="">
        <CCardHeader>
          Edit Page {loading && <CSpinner size="sm" /> }
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
                <CFormInput disabled={loading} defaultValue={delivery.delivery} type="number" name="delivery" id="validationCustom01" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
                <CFormFeedback invalid>Error occurs!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom03">Date</CFormLabel>
                <CFormInput name="date" type="date" id="validationCustom03" disabled={loading}
                defaultValue={delivery.date} required/>
                <CFormFeedback invalid>Please provide a valid date.</CFormFeedback>
                <CFormFeedback valid>Looks good!.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom04">Rate</CFormLabel>
                <CFormInput name="rate" type="number" id="validationCustom04" disabled={loading}
                defaultValue={delivery.rate} required/>
                <CFormFeedback invalid>Please provide a rate.</CFormFeedback>
                <CFormFeedback valid>Looks good!.</CFormFeedback>
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit" disabled={loading}>
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
