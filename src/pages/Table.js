import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CSpinner,
  CTableCaption,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { getAllDocuments, deleteDocument } from '../firebase/crud'
import { useAuth } from '../contexts/authContext' 

const Tables = () => {
  const { currentUser } = useAuth();
  const [ deliveries, setDeliveries ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const getDeliveries = async () => {
    setLoading(true)
    const result = await getAllDocuments("deliveries", currentUser.uid);
    if(result.success) {
      setLoading(false)
      setDeliveries(result.data)
    }
  };
  useEffect(() => {
    getDeliveries();
  }, [currentUser]);
  
  const handelDelete = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.id;
    if(confirm("Are sure to delete?")){
      setLoading(true)
      const result = await deleteDocument('deliveries', id);
      if(result.success){
        getDeliveries();
      }
      setLoading(false)
    }
  }
  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> {loading && <CSpinner size="sm" /> }
          </CCardHeader>
          <CCardBody>
              <CTable align="middle" responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" className="w-5">
                      #
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="w-40">
                      Delivery Date
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="w-10">
                      Delivery
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="w-10">
                      Rate
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="w-10">
                      Earning
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="w-25">
                      Action
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {deliveries.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      {index+1}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.data.date}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.data.delivery}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.data.rate}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.data.earning}
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to={"/edit/"+item.id}><CButton color="primary">Edit</CButton></Link>
                      <CButton color="dark" data-id={item.id} onClick={handelDelete}>Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
