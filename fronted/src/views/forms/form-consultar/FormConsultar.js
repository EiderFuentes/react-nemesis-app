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
import FormControl from '../form-control/FormControl';

const FormConsultar = () => {

  const [identificacion, setIdentificacion] = useState('')

  // Estado para almacenar el resto de los datos del formulario
  const [formData, setFormData] = useState(initialFormData)

  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    setIdentificacion(e.target.value)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setError(null)
    setFormData(null)


    try {
      const respose = await axios.get( `http://localhost:3001/caracterizacion/${ identificacion }` );
      console.log('===================================');
      console.log('Se muestran los datos del beneficiario');
      console.log(respose);
      console.log('===================================');
      setFormData(respose.data);
    } catch (err) {
      setError('No se encontró el beneficiario con la identificación proporcionada')
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
                    <CRow className="mb-3">
                    <CCol md={12}>
                      {error && <CAlert color="danger">{error}</CAlert>}

                      {/* Uso el Componente Ingresar dentro del Componente Consultar */}
                      {formData && (
                        <FormControl readOnly={true} initialValues={formData} />
                      )}

                    </CCol>
                    </CRow>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormConsultar
