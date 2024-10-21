import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth'
import { useAuth } from '../../../contexts/authContext'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CFormFeedback,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const { userLoggedIn } = useAuth()
  console.log(userLoggedIn)
    const [email, setEmail] = useState('absiddik517@gmail.com')
    const [password, setPassword] = useState('1234567')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
        //alert(email)
            setIsSigningIn(true)
            setErrorMessage(null)
            try{
              const user = await doSignInWithEmailAndPassword(email, password)
              console.log(userLoggedIn)
              console.log(user)
              setIsSigningIn(false)
            }catch(error){
              setErrorMessage(error.message)
              setIsSigningIn(false)
            }
        }
    }

    
    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    {userLoggedIn && (<Navigate to={'/dashboard'} replace={true} />)}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>
                      <CRow>
                        <CCol xs={6}>Login</CCol>
                        <CCol xs={6} className="text-right">
                          <Link to="/register" className="text-right">
                            <CButton color="primary" active tabIndex={-1}>
                              Register Now!
                            </CButton>
                          </Link>
                        </CCol>
                      </CRow>
                     </h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                     <div className="mb-3">&nbsp;{errorMessage}</div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                      placeholder="Email" 
                      onChange={(e) => { setEmail(e.target.value) }} 
                      defaultValue={email}
                      autoComplete="email" />
                     
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        defaultValue={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton disabled={isSigningIn} color="primary" className="px-4" onClick={(e) => { onSubmit(e) }}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton disabled={isSigningIn} color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="mt-3">
                      <CCol xs={12}>
                        <CButton disabled={isSigningIn} color="primary" onClick={(e) => { onGoogleSignIn(e) }}>
                          Login with Google
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
