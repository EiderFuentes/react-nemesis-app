import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CFormSelect,
  CFormCheck,
  CAlert,
} from '@coreui/react'
import axios from 'axios'
import { initialFormData } from '../form-control/initialFormData'

const FormConsultar = () => {
  const [identificacion, setIdentificacion] = useState('')

  // Estado para almacenar el resto de los datos del formulario
  const [formData, setFormData] = useState(initialFormData)

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    setIdentificacion(e.target.value)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setError(null)
    setUser(null)

    try {
      const response = await axios.get(
        `http://localhost:3001/caracterizacion/identificacion/${identificacion}`,
      )
      setUser(response.data)
    } catch (err) {
      setError('No se encontró el beneficiario con la identificación proporcionada.')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Consultar</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CAccordion>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader> BUSCAR BENEFICIARIO POR IDENTIFICACION </CAccordionHeader>
                  <CAccordionBody>
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="identificacion" className="required-label">
                          1. Identificacion
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="identificacion"
                          name="identificacion"
                          placeholder="Ingrese la identificación"
                          value={identificacion}
                          onChange={handleInputChange}
                        />
                      </CCol>
                      <CCol md={6}>
                        <CButton color="primary" onClick={handleSearch}>
                          Buscar
                        </CButton>
                      </CCol>
                    </CRow>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </CForm>

            {error && <CAlert color="danger">{error}</CAlert>}

            {user && (
              <div style={{ marginTop: '20px' }}>
                <h6>Información del Beneficiario:</h6>
                <p>
                  <strong>Nombre Encuentador:</strong> {user.nombreEncuestador}
                </p>
                <p>
                  <strong>Fecha:</strong> {user.fechaEncuesta}
                </p>
                {/* Agrega otros campos según la estructura de tu entidad de usuario */}
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormConsultar
