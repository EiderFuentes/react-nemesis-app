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
  CAlert
} from '@coreui/react'
import axios from 'axios';
import { paramsApi } from './paramsApi';
import { initialFormData } from './initialFormData';
import './styles.css';


const FormControl = ({ readOnly = false, initialValues = {} }) => {
  // Estado para almacenar el número de personas en la vivienda
  const [totalPersonas, setTotalPersonas] = useState(0);


  const [mensajeError, setMensajeError] = useState([]);

  // Estado para almacenar la información de cada persona
  const [miembrosFamilia, setMiembrosFamilia] = useState([]);

  // Estado para almacenar el resto de los datos del formulario
  const [formData, setFormData] = useState(initialFormData);

  const handleCheckboxChange = (e, groupName) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [groupName]: {
        ...prevState[groupName],
        [name]: checked ? 'S' : 'N' // Almacena 'S' si está marcado y 'N' si no lo está.
      }
    }));
  };

  // Función que maneja el cambio en el campo totalPersonasVivienda
  const handleTotalPersonasChange = (e) => {
    handleFormChange(e);
    const total = parseInt(e.target.value) || 0;
    setTotalPersonas(total);

    // Crear un array de personas con valores iniciales
    const nuevaPersonas = Array.from({ length: total }, (_, i) => ({
      nombresApellidos: '',
      sexo: '', // Valor por defecto
      edad: '',
      tipoEdad: '',
      estadoCivil: '',
      parentesco: '',
      ocupacion: '',
      aportaIngresos: '',
      nivelEscolaridad: '',
      tipoAfiliacionSalud: '',
      grupoAtencionEspecial: '',
      discapacidad: ''
    }));
    setMiembrosFamilia(nuevaPersonas);
  };

  // Función que maneja el cambio en los campos de cada persona
  const handlePersonaChange = (index, campo, valor) => {
    const nuevasPersonas = [...miembrosFamilia];
    nuevasPersonas[index][campo] = valor;
    setMiembrosFamilia(nuevasPersonas);
  };

  // Función para manejar los cambios en los campos del formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para guardar los datos al presionar el botón "Guardar"
  const handleSave = async () => {
    const dataToSave = {
      ...formData,
      miembrosFamilia
    };
    if (readOnly) return;
    try {
      setMensajeError([]);
      const datosApi = paramsApi(dataToSave);
      //console.log(datosApi);
      const { status, data, response } = await axios.post('http://localhost:3001/caracterizacion', datosApi)
      console.log('===================================');
      console.log('Se guardaron los datos');
      console.log(status);
      console.log('===================================');
    } catch (e) {
      const { status, response: { data: { message } } } = e;
      setMensajeError(message);
      console.log('-----------------------------------------------');
      console.log('ERROR GUARDANDO LOS DATOS');
      console.log(status);
      console.log(message);
      console.log('-----------------------------------------------');
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
          <strong>{ readOnly ? 'Información del Beneficiario' : 'Registro' }</strong>
          </CCardHeader>
          {mensajeError.length > 0 && (
            mensajeError.map((mensaje, index) => (
              <CAlert key={index} color="danger" dismissible>
                <strong>{mensaje}</strong>
              </CAlert>
            ))
          )}
          <CCardBody>
            <CForm>
              <CAccordion>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>A. CONTROL DE CALIDAD DE LA ENCUESTA #1</CAccordionHeader>
                  <CAccordionBody>
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="nombreEncuestador" className="required-label">1. Nombre del Encuestador</CFormLabel>
                        <CFormInput
                          type="text"
                          id="nombreEncuestador"
                          name="nombreEncuestador"
                          placeholder="Ingresa el nombre del encuestador"
                          value={formData.nombreEncuestador}
                          onChange={handleFormChange}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="fechaEncuesta" className="required-label">2. Fecha de la Encuesta</CFormLabel>
                        <CFormInput
                          type="date"
                          id="fechaEncuesta"
                          name="fechaEncuesta"
                          value={formData.fechaEncuesta}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={4}>
                        <CFormLabel htmlFor="horaInicioEncuesta">3. Hora de Inicio</CFormLabel>
                        <CFormInput
                          type="time"
                          id="horaInicioEncuesta"
                          name="horaInicioEncuesta"
                          value={formData.horaInicioEncuesta}
                          onChange={handleFormChange}
                        />
                      </CCol>
                      <CCol md={4}>
                        <CFormLabel htmlFor="horaFinEncuesta">Hora de Fin</CFormLabel>
                        <CFormInput
                          type="time"
                          id="horaFinEncuesta"
                          name="horaFinEncuesta"
                          value={formData.horaFinEncuesta}
                          onChange={handleFormChange}
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="nombreSupervisorEncuestador">Nombre del Supervisor</CFormLabel>
                        <CFormInput
                          type="text"
                          id="nombreSupervisorEncuestador"
                          name="nombreSupervisorEncuestador"
                          placeholder="Ingresa el nombre del supervisor"
                          value={formData.nombreSupervisorEncuestador}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={2}>
                  <CAccordionHeader>B. DATOS GENERALES #2</CAccordionHeader>
                  <CAccordionBody>
                    <CAccordion>
                      <CAccordionItem itemKey={1}>
                        <CAccordionHeader>I. IDENTIFICACIÓN #1</CAccordionHeader>
                        <CAccordionBody>
                          {/* <CForm> */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="identificacion" className="required-label">5. Identificación</CFormLabel>
                              <CFormInput
                                type="text" id="identificacion"
                                name='identificacion'
                                placeholder="Ingresa tu identificación"
                                value={formData.identificacion}
                                onChange={handleFormChange}
                              />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="nombreApellido" className="required-label">6. Nombres y apellidos encuestado(a) </CFormLabel>
                              <CFormInput
                                type="text" id="nombreApellido"
                                name='nombreApellido'
                                placeholder="Ingresa tu nombre y apellido"
                                value={formData.nombreApellido}
                                onChange={handleFormChange} />
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="sexo" className="required-label">7. Sexo</CFormLabel>
                              <CFormSelect id="sexo"
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleFormChange}
                              >
                                <option value="">Seleccione opción</option>
                                <option value="F">Femenino</option>
                                <option value="M">Masculino</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="edad" className="required-label">8. Edad</CFormLabel>
                              <CFormInput type="number"
                                name='edad'
                                id="edad" placeholder="Ingresa tu edad"
                                value={formData.edad}
                                onChange={handleFormChange}
                              />
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="direccion" className="required-label">9. Dirección (o nombre de finca o vereda)</CFormLabel>
                              <CFormInput type="text" id="direccion"
                                name='direccion'
                                placeholder="Ingresa tu dirección"
                                value={formData.direccion}
                                onChange={handleFormChange}
                              />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="barrio" className="required-label">10. Barrio</CFormLabel>
                              <CFormInput type="text" id="barrio"
                                name='barrio'
                                placeholder="Ingresa tu barrio"
                                value={formData.barrio}
                                onChange={handleFormChange} />
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="municipio" className="required-label">Municipio</CFormLabel>
                              <CFormInput type="text" id="municipio"
                                placeholder="Ingresa tu municipio"
                                name='municipio'
                                value={formData.municipio}
                                onChange={handleFormChange}
                              />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="telefono" className="required-label">11. Teléfono</CFormLabel>
                              <CFormInput type="text" id="telefono"
                                placeholder="Ingresa tu teléfono"
                                name='telefono'
                                value={formData.telefono}
                                onChange={handleFormChange}
                              />
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="organizacionComunitariaProyecto" className="required-label">
                                12. ¿Usted o su familia pertenecen a alguna organización comunitaria y/o participan en algun proyecto comunitario especifico?
                              </CFormLabel>
                              <CFormSelect id="organizacionComunitariaProyecto"
                                name='organizacionComunitariaProyecto'
                                value={formData.organizacionComunitariaProyecto}
                                onChange={handleFormChange}>
                                <option value="">Seleccione opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="cualOrganizacionComunitariaProyecto">
                                ¿Cuál?
                              </CFormLabel>
                              <CFormInput
                                type="text"
                                name='cualOrganizacionComunitariaProyecto'
                                id="cualOrganizacionComunitariaProyecto"
                                placeholder="Ingresa el nombre de la organización"
                                value={formData.cualOrganizacionComunitariaProyecto}
                                onChange={handleFormChange}
                              />
                            </CCol>
                          </CRow>
                          {/* </CForm> */}
                        </CAccordionBody>
                      </CAccordionItem>
                      <CAccordionItem itemKey={2}>
                        <CAccordionHeader>II. TOTAL DE PERSONAS EN LA VIVIENDA #2</CAccordionHeader>
                        <CAccordionBody>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="totalPersonasVivienda" className="required-label">13. ¿Cuantas personas viven en la Vivienda?</CFormLabel>
                              <CFormInput
                                type="number"
                                id="totalPersonasVivienda"
                                name="totalPersonasVivienda"
                                placeholder="Ingresa el total de personas"
                                value={totalPersonas}
                                onChange={handleTotalPersonasChange}
                              />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="totalFamiliasVivienda" className="required-label">14. ¿Cuántas familias residen de manera habitual la Vivienda?</CFormLabel>
                              <CFormInput
                                type="number"
                                id="totalFamiliasVivienda"
                                name="totalFamiliasVivienda"
                                placeholder="Ingresa el total de familias"
                                value={formData.totalFamiliasVivienda}
                                onChange={handleFormChange}
                              />
                            </CCol>
                          </CRow>
                        </CAccordionBody>

                      </CAccordionItem>
                      <CAccordionItem itemKey={3}>
                        <CAccordionHeader>III. MIEMBROS DE LA FAMILIA #3</CAccordionHeader>
                        <CAccordionBody>
                          {/* Generación dinámica de los campos para cada persona */}
                          {miembrosFamilia.map((persona, index) => (
                            <div key={index}>
                              <h5>Persona {index + 1}</h5>
                              <CRow className="mb-3">
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`nombresApellidos-${index}`} className="required-label">15. Nombres y Apellidos</CFormLabel>
                                  <CFormInput
                                    type="text"
                                    id={`nombresApellidos-${index}`}
                                    placeholder="Ingresa los nombres y apellidos"
                                    value={persona.nombresApellidos}
                                    onChange={(e) => handlePersonaChange(index, 'nombresApellidos', e.target.value)}
                                  />
                                </CCol>
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`sexo-${index}`} className="required-label">16. Sexo</CFormLabel>
                                  <CFormSelect
                                    id={`sexo-${index}`}
                                    value={persona.sexo}
                                    onChange={(e) => handlePersonaChange(index, 'sexo', e.target.value)}
                                  >
                                    <option value="">Seleccione opción</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                  </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`edad-${index}`} className="required-label">17. Edad</CFormLabel>
                                  <CFormInput
                                    type="number"
                                    id={`edad-${index}`}
                                    placeholder="Ingresa la edad"
                                    value={persona.edad}
                                    onChange={(e) => handlePersonaChange(index, 'edad', e.target.value)}
                                  />
                                </CCol>
                              </CRow>
                              <CRow className="mb-3">
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`tipoEdad-${index}`} className="required-label">Tipo de Edad</CFormLabel>
                                  <CFormSelect
                                    id={`tipoEdad-${index}`}
                                    value={persona.tipoEdad}
                                    onChange={(e) => handlePersonaChange(index, 'tipoEdad', e.target.value)}
                                  >
                                    <option value="">Seleccione opción</option>
                                    <option value="A">Años</option>
                                    <option value="M">Meses</option>
                                    <option value="D">Días</option>
                                  </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`estadoCivil-${index}`} className="required-label">18. Estado Civil</CFormLabel>
                                  <CFormSelect
                                    id={`estadoCivil-${index}`}
                                    value={persona.estadoCivil}
                                    onChange={(e) => handlePersonaChange(index, 'estadoCivil', e.target.value)}
                                  >
                                    <option value="">Seleccione opción</option>
                                    <option value={1}>Soltero(a)</option>
                                    <option value={2}>Casado(a)</option>
                                    <option value={3}>Separado(a)</option>
                                    <option value={4}>Viudo(a)</option>
                                    <option value={5}>Unión libre</option>
                                    <option value={6}>Otro</option>
                                  </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`parentesco-${index}`} className="required-label">19. Parentesco(respecto a quien responde la encuesta)</CFormLabel>
                                  <CFormSelect
                                    id={`parentesco-${index}`}
                                    value={persona.parentesco}
                                    onChange={(e) => handlePersonaChange(index, 'parentesco', e.target.value)}
                                  >
                                    <option value="">Seleccione opción</option>
                                    <option value={1}>Jefe(a)de familia</option>
                                    <option value={2}>Cónyugue o compañero(a)</option>
                                    <option value={3}>Hijo(a)</option>
                                    <option value={4}>Hermano(a)</option>
                                    <option value={5}>Padre o madre(a)</option>
                                    <option value={6}>Otro</option>
                                  </CFormSelect>
                                </CCol>
                              </CRow>
                              <CRow className="mb-3">
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`ocupacion-${index}`} className="required-label">20. Ocupación</CFormLabel>
                                  <CFormSelect
                                    id={`ocupacion-${index}`}
                                    value={persona.ocupacion}
                                    onChange={(e) => handlePersonaChange(index, 'ocupacion', e.target.value)}
                                  >
                                    <option value="">Seleccione opción</option>
                                    <option value={1}>Empleado</option>
                                    <option value={2}>Trabajador independiente</option>
                                    <option value={3}>Ama de casa</option>
                                    <option value={4}>Jubilado, pensionado</option>
                                    <option value={5}>Desempleado</option>
                                    <option value={6}>Estudiante</option>
                                    <option value={7}>No aplica por edad</option>
                                  </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`aportaIngresos-${index}`} className="required-label">21. Aporta ingresos económicos a la familia</CFormLabel>
                                  <CFormSelect
                                    id={`aportaIngresos-${index}`}
                                    value={persona.aportaIngresos}
                                    onChange={(e) => handlePersonaChange(index, 'aportaIngresos', e.target.value)}
                                  >
                                    <option value="">Seleccione opción</option>
                                    <option value={1}>Sí</option>
                                    <option value={2}>No</option>
                                    <option value={3}>No aplica</option>
                                  </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`nivelEscolaridad-${index}`} className="required-label">22. Nivel de Escolaridad</CFormLabel>
                                  <CFormSelect
                                    id={`nivelEscolaridad-${index}`}
                                    value={persona.nivelEscolaridad}
                                    onChange={(e) => handlePersonaChange(index, 'nivelEscolaridad', e.target.value)}
                                  >
                                    <option value={1}>Ninguno</option>
                                    <option value={2}>Primaria completa</option>
                                    <option value={3}>Primaria incompleta</option>
                                    <option value={4}>Secundaria completa</option>
                                    <option value={5}>Secundaria incompleta</option>
                                    <option value={6}>Técnica o tecnológia</option>
                                    <option value={7}>Universitaria</option>
                                    <option value={8}>Postgrado</option>
                                    <option value={9}>Otro</option>
                                  </CFormSelect>
                                </CCol>
                              </CRow>
                              <CRow className="mb-3">
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`tipoAfiliacionSalud-${index}`} className="required-label">23. Tipo afiliación en salud</CFormLabel>
                                  <CFormSelect
                                    id={`tipoAfiliacionSalud-${index}`}
                                    value={persona.tipoAfiliacionSalud}
                                    onChange={(e) => handlePersonaChange(index, 'tipoAfiliacionSalud', e.target.value)}
                                  >
                                    <option value="">Seleccione opción</option>
                                    <option value={1}>Contributivo</option>
                                    <option value={2}>Subsidiado</option>
                                    <option value={3}>Sisbén</option>
                                    <option value={4}>Ninguno</option>
                                  </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`grupoAtencionEspecial-${index}`} className="required-label">24. Grupo de atención especial</CFormLabel>
                                  <CFormSelect
                                    id={`grupoAtencionEspecial-${index}`}
                                    value={persona.grupoAtencionEspecial}
                                    onChange={(e) => handlePersonaChange(index, 'grupoAtencionEspecial', e.target.value)}
                                  >
                                    <option value="">Seleccione opción</option>
                                    <option value={1}>Desplazado</option>
                                    <option value={2}>Afrodecendiente</option>
                                    <option value={3}>Indígenas</option>
                                    <option value={4}>No aplica</option>
                                  </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                  <CFormLabel htmlFor={`discapacidad-${index}`} className="required-label">25. Discapacidad</CFormLabel>
                                  <CFormSelect
                                    id={`discapacidad-${index}`}
                                    value={persona.discapacidad}
                                    onChange={(e) => handlePersonaChange(index, 'discapacidad', e.target.value)}
                                  >
                                    <option value="">Seleccione opción</option>
                                    <option value={1}>Motora</option>
                                    <option value={2}>Auditiva</option>
                                    <option value={3}>Visual</option>
                                    <option value={4}>Del habla</option>
                                    <option value={5}>Mental</option>
                                    <option value={6}>Otra</option>
                                    <option value={7}>Ninguna</option>
                                  </CFormSelect>
                                </CCol>
                              </CRow>
                            </div>
                          ))}
                        </CAccordionBody>
                      </CAccordionItem>
                    </CAccordion>
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={3}>
                  <CAccordionHeader>C. ENCUESTA PSICOSOCIAL #4</CAccordionHeader>
                  <CAccordionBody>
                    {/* Pregunta 26 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="haRecibidoAyuda" className="required-label">26. ¿Ha recibido algún tipo de ayuda o apoyo?</CFormLabel>
                        <CFormSelect
                          id="haRecibidoAyuda"
                          name="haRecibidoAyuda"
                          value={formData.haRecibidoAyuda}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Sí</option>
                        </CFormSelect>
                      </CCol>

                      <CCol md={6}>
                        <CFormLabel htmlFor="nombreAyudaOrganizacion">26.1 Si, ¿de cuál organización?</CFormLabel>
                        <CFormInput
                          type="text"
                          id="nombreAyudaOrganizacion"
                          name="nombreAyudaOrganizacion"
                          value={formData.nombreAyudaOrganizacion}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={12}>
                        <CFormLabel htmlFor="tipoAyuda">26.2 ¿Qué tipo de ayuda?</CFormLabel>
                        <CFormInput
                          type="text"
                          id="tipoAyuda"
                          name="tipoAyuda"
                          value={formData.tipoAyuda}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>
                    {/* Pregunta 27 */}
                    <CRow className="mb-3">
                      <CCol md={12}>
                        <CFormLabel htmlFor="principalNecesidad" className="required-label">27. ¿Cuál es la principal necesidad de su familia?</CFormLabel>
                        <CFormInput
                          type="text"
                          id="principalNecesidad"
                          name="principalNecesidad"
                          value={formData.principalNecesidad}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>

                    {/* Pregunta 28 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="haSidoDesplazado" className="required-label">28. ¿Ha sido desplazado por la violencia en los últimos 10 años?</CFormLabel>
                        <CFormSelect
                          id="haSidoDesplazado"
                          name="haSidoDesplazado"
                          value={formData.haSidoDesplazado}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Sí</option>
                        </CFormSelect>
                      </CCol>

                      <CCol md={6}>
                        <CFormLabel htmlFor="haceCuantoTiempoDesplazado">28.1 Si es sí, ¿Hace cuánto tiempo?</CFormLabel>
                        <CFormInput
                          type="text"
                          id="haceCuantoTiempoDesplazado"
                          name="haceCuantoTiempoDesplazado"
                          value={formData.haceCuantoTiempoDesplazado}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="lugarDeDesplazado">28.2 ¿De qué lugar?</CFormLabel>
                        <CFormInput
                          type="text"
                          id="lugarDeDesplazado"
                          name="lugarDeDesplazado"
                          value={formData.lugarDeDesplazado}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CCol md={12}>
                        <CFormLabel>Nota: En caso de haber respondido "No", por favor pase a la pregunta No: 33</CFormLabel>
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                    <CCol md={6}>
                        <CFormLabel htmlFor="deseaVolverAlSitioDeDesplazado">29. ¿Desea volver al sitio de donde fue desplazado?</CFormLabel>
                        <CFormSelect
                          id="deseaVolverAlSitioDeDesplazado"
                          name="deseaVolverAlSitioDeDesplazado"
                          value={formData.deseaVolverAlSitioDeDesplazado}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Sí</option>
                        </CFormSelect>
                      </CCol>

                      <CCol md={6}>
                        <CFormLabel htmlFor="porqueSiNoDesea">29.1 ¿Por qué?</CFormLabel>
                        <CFormInput
                          type="text"
                          id="porqueSiNoDesea"
                          name="porqueSiNoDesea"
                          value={formData.porqueSiNoDesea}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>

                    {/* Pregunta 30 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="haSidoRechazadoDespuesDeDesplazado">30. ¿Ha sido rechazado o discriminado después del desplazamiento?</CFormLabel>
                        <CFormSelect
                          id="haSidoRechazadoDespuesDeDesplazado"
                          name="haSidoRechazadoDespuesDeDesplazado"
                          value={formData.haSidoRechazadoDespuesDeDesplazado}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Sí</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={12}>
                        <CFormLabel>31. ¿Qué cambios ha presentado la familia después del desplazamiento? (puede seleccionar varias opciones)</CFormLabel>

                        <CFormCheck
                          type="checkbox"
                          id="estanUnidos"
                          name="estanUnidos"
                          label="a. Están más unidos"
                          checked={formData.desplazamiento.estanUnidos === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'desplazamiento')}
                        />
                        <CFormCheck
                          type="checkbox"
                          id="desintegroFamilia"
                          name="desintegroFamilia"
                          label="b. Se desintegró la familia"
                          checked={formData.desplazamiento.desintegroFamilia === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'desplazamiento')}
                        />
                        <CFormCheck
                          type="checkbox"
                          id="problemasFamiliares"
                          name="problemasFamiliares"
                          label="c. Hay problemas familiares"
                          checked={formData.desplazamiento.problemasFamiliares === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'desplazamiento')}
                        />
                        <CFormCheck
                          type="checkbox"
                          id="ningunCambio"
                          name="ningunCambio"
                          label="d. Ningún cambio"
                          checked={formData.desplazamiento.ningunCambio === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'desplazamiento')}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={12}>
                        <CFormLabel htmlFor="afectadoConsecuenciaDesplazamiento">
                          32. ¿Qué tan afectados de manera negativa están usted y su familia?
                        </CFormLabel>
                        <CFormSelect
                          id="afectadoConsecuenciaDesplazamiento"
                          name="afectadoConsecuenciaDesplazamiento"
                          value={formData.afectadoConsecuenciaDesplazamiento}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione una opción</option>
                          <option value={1}>Muy afectados</option>
                          <option value={2}>Poco afectados</option>
                          <option value={3}>Nada afectados</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={12}>
                        <CFormLabel htmlFor="haSidoPositivoElDesplazamiento">
                          33. ¿El desplazamiento ha sido positivo para su familia?
                        </CFormLabel>
                        <CFormSelect
                          id="haSidoPositivoElDesplazamiento"
                          name="haSidoPositivoElDesplazamiento"
                          value={formData.haSidoPositivoElDesplazamiento}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione una opción</option>
                          <option value={1}>Muy positivo</option>
                          <option value={2}>Poco positivo</option>
                          <option value={3}>Nada positivo</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={12}>
                        <CFormLabel className="required-label">34. ¿Qué lugar prefieren estar la mayor parte del tiempo? (puede seleccionar varias opciones)</CFormLabel>
                        <CFormCheck
                          type="checkbox"
                          id="sala"
                          name="sala"
                          label="a. En la sala"
                          checked={formData.tiempoCasa.sala === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'tiempoCasa')}
                        />
                        <CFormCheck
                          type="checkbox"
                          id="cocina"
                          name="cocina"
                          label="b. En la cocina"
                          checked={formData.tiempoCasa.cocina === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'tiempoCasa')}
                        />
                        <CFormCheck
                          type="checkbox"
                          id="habitacion"
                          name="habitacion"
                          label="c. En la habitación"
                          checked={formData.tiempoCasa.habitacion === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'tiempoCasa')}
                        />
                        <CFormCheck
                          type="checkbox"
                          id="otro_34"
                          name="otro_34"
                          label="d. Otro"
                          checked={formData.tiempoCasa.otro_34 === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'tiempoCasa')}
                        />
                        <CFormInput
                          type="text"
                          id="especifiqueOtro_34"
                          name="especifiqueOtro_34"
                          placeholder="d. Otro. Especifique"
                          value={formData.especifiqueOtro_34}
                          onChange={handleFormChange}
                          className="mt-2"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="comoConsumenLosAlimentos" className="required-label">
                          35. Cuándo consumen los alimentos en su familia, lo hacen:
                        </CFormLabel>
                        <CFormSelect
                          id="comoConsumenLosAlimentos"
                          name="comoConsumenLosAlimentos"
                          value={formData.comoConsumenLosAlimentos}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione una opción</option>
                          <option value={1}>Reunidos en familia</option>
                          <option value={2}>Cada quién por separado</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>

                    {/* Pregunta 36 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="maltratoViolenciaEnLaFamilia" className="required-label">
                          36. ¿Al interior de su familia se presentan o se han presentado casos de maltrato o violencia?
                        </CFormLabel>
                        <CFormSelect
                          id="maltratoViolenciaEnLaFamilia"
                          name="maltratoViolenciaEnLaFamilia"
                          value={formData.maltratoViolenciaEnLaFamilia}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Si</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>

                    {/* Pregunta 37 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="haPedidoAyudaDenunciado">
                          37. En caso de responder Sí a la anterior pregunta, ¿Ha pedido ayuda o ha denunciado estos casos?
                        </CFormLabel>
                        <CFormSelect
                          id="haPedidoAyudaDenunciado"
                          name="haPedidoAyudaDenunciado"
                          value={formData.haPedidoAyudaDenunciado}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Si</option>
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="haPedidoAyudaDenunciadoPorQue">
                          37. ¿Por qué?
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="haPedidoAyudaDenunciadoPorQue"
                          name="haPedidoAyudaDenunciadoPorQue"
                          value={formData.haPedidoAyudaDenunciadoPorQue}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>

                    {/* Pregunta 38 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="decisionesImportantesEnFamilia" className="required-label">
                          38. ¿Cómo se toman las decisiones más importantes en su familia?
                        </CFormLabel>
                        <CFormSelect
                          id="decisionesImportantesEnFamilia"
                          name="decisionesImportantesEnFamilia"
                          value={formData.decisionesImportantesEnFamilia}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione una opción</option>
                          <option value={1}>Con diálogo</option>
                          <option value={2}>Es decisión del padre</option>
                          <option value={3}>Es decisión de la madre</option>
                          <option value={4}>Otro. Especifique</option>
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="decisionesFamilia">
                          38. Otro. Especifique
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="decisionesFamilia"
                          name="decisionesFamilia"
                          value={formData.decisionesFamilia}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>

                    {/* Pregunta 39 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="seSienteAgustoEnLaVivienda" className="required-label">
                          39. ¿Se siente a gusto en la vivienda que habita actualmente?
                        </CFormLabel>
                        <CFormSelect
                          id="seSienteAgustoEnLaVivienda"
                          name="seSienteAgustoEnLaVivienda"
                          value={formData.seSienteAgustoEnLaVivienda}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Si</option>
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="seSienteAgustoEnLaViviendaPorQue">
                          39. ¿Qué es lo que más le gusta? - ¿Qué es lo que menos le gusta?
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="seSienteAgustoEnLaViviendaPorQue"
                          name="seSienteAgustoEnLaViviendaPorQue"
                          value={formData.seSienteAgustoEnLaViviendaPorQue}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>

                    {/* Pregunta 40 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="necesitaCapacitarse" className="required-label">
                          40. ¿Considera que necesita capacitarse?
                        </CFormLabel>
                        <CFormSelect
                          id="necesitaCapacitarse"
                          name="necesitaCapacitarse"
                          value={formData.necesitaCapacitarse}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Si</option>
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="necesitaCapacitarseEspecifique">
                          40. ¿En qué? - ¿Por qué?
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="necesitaCapacitarseEspecifique"
                          name="necesitaCapacitarseEspecifique"
                          value={formData.necesitaCapacitarseEspecifique}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>

                    {/* Pregunta 41 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="emprenderNegocio" className="required-label">
                          41. ¿Le gustaría emprender un negocio?
                        </CFormLabel>
                        <CFormSelect
                          id="emprenderNegocio"
                          name="emprenderNegocio"
                          value={formData.emprenderNegocio}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Sí</option>
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="emprenderNegocioEspecifique">
                          41. ¿De qué? - o ¿Por qué?
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="emprenderNegocioEspecifique"
                          name="emprenderNegocioEspecifique"
                          value={formData.emprenderNegocioEspecifique}
                          onChange={handleFormChange}
                        />
                      </CCol>
                    </CRow>

                    {/* Pregunta 42 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="condicionesDeVida" className="required-label">
                          42. ¿Cómo cree que serán las condiciones de vida de usted y su familia en un año?
                        </CFormLabel>
                        <CFormSelect
                          id="condicionesDeVida"
                          name="condicionesDeVida"
                          value={formData.condicionesDeVida}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione una opción</option>
                          <option value={1}>Seguirán siendo iguales</option>
                          <option value={2}>Mejorarán</option>
                          <option value={3}>Empeorarán</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>

                    {/* Pregunta 43 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="fumaCigarrillo" className="required-label">
                          43. Fuma cigarrillo y/o tabaco?
                        </CFormLabel>
                        <CFormSelect
                          id="fumaCigarrillo"
                          name="fumaCigarrillo"
                          value={formData.fumaCigarrillo}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Si</option>
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="consumeLicor" className="required-label">
                          43. Consume licor?
                        </CFormLabel>
                        <CFormSelect
                          id="consumeLicor"
                          name="consumeLicor"
                          value={formData.consumeLicor}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Si</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>

                    {/* Pregunta 44 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="consumeMedicamentos" className="required-label">
                          44. Consume medicamentos para dormir y/o calmar los nervios?
                        </CFormLabel>
                        <CFormSelect
                          id="consumeMedicamentos"
                          name="consumeMedicamentos"
                          value={formData.consumeMedicamentos}
                          onChange={handleFormChange}
                        >
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Si</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>

                    {/* Pregunta 45 */}
                    {/* Pregunta 45 */}
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel className="required-label">
                          45. ¿A qué dedica su familia el tiempo libre? (puede señalar varias opciones)
                        </CFormLabel>
                        <CFormCheck
                          type="checkbox"
                          id="reunionesFamiliares"
                          name="reunionesFamiliares"
                          label="a. Hacer reuniones familiares"
                          checked={formData.tiempoLibre.reunionesFamiliares === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'tiempoLibre')}
                        />
                        <CFormCheck
                          type="checkbox"
                          id="paseos"
                          name="paseos"
                          label="b. Paseos"
                          checked={formData.tiempoLibre.paseos === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'tiempoLibre')}
                        />
                        <CFormCheck
                          type="checkbox"
                          id="practicarDeporte"
                          name="practicarDeporte"
                          label="c. Practicar algún tipo de deporte"
                          checked={formData.tiempoLibre.practicarDeporte === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'tiempoLibre')}
                        />
                        <CFormCheck
                          type="checkbox"
                          id="otro_45"
                          name="otro_45"
                          label="d. Otro"
                          checked={formData.tiempoLibre.otro_45 === 'S'}
                          onChange={(e) => handleCheckboxChange(e, 'tiempoLibre')}
                        />
                        <CFormInput
                          type="text"
                          id="especifiqueOtro_45"
                          name="especifiqueOtro_45"
                          placeholder="d. Otro. Especifique"
                          value={formData.especifiqueOtro_45}
                          onChange={handleFormChange}
                          className="mt-2"
                        />
                      </CCol>
                    </CRow>
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={4}>
                  <CAccordionHeader>D. VIVIENDA #5</CAccordionHeader>
                  <CAccordionBody>
                    <CAccordion>
                      <CAccordionItem itemKey={1}>
                        <CAccordionHeader>I. TENENCIA DE LA VIVIENDA #1</CAccordionHeader>
                        <CAccordionBody>
                          {/* Pregunta 46 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                46. La vivienda ocupada por este hogar es:
                              </CFormLabel>

                              <CFormSelect
                                id="viviendaOcupada"
                                name="viviendaOcupada"
                                value={formData.viviendaOcupada}
                                onChange={handleFormChange}
                              >
                                <option value="">Seleccione una opción</option>
                                <option value={1}>1. Propia, totalmente pagada</option>
                                <option value={2}>2. Propia, la están pagando</option>
                                <option value={3}>3. En arriendo (Valor) $</option>
                                <option value={3}>4. Otro. Especifique </option>
                              </CFormSelect>
                              {/* Campo adicional para especificar si es arriendo */}
                              {/* {formData.viviendaOcupada === '3' && ( */}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel>
                                46. Especifique o ingrese valor de arriendo ($):
                              </CFormLabel>
                              <CFormInput
                                type="text"
                                id="viviendaOcupadaEspecifique"
                                name="viviendaOcupadaEspecifique"
                                placeholder="Especifique / Valor de arriendo ($)"
                                value={formData.viviendaOcupadaEspecifique}
                                onChange={handleFormChange}
                                className="mt-2"
                              />
                              {/* )} */}
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                47. El lote donde está ubicada la vivienda es legalizado:
                              </CFormLabel>
                              <CFormSelect
                                id="loteViviendaLegal"
                                name="loteViviendaLegal"
                                value={formData.loteViviendaLegal}
                                onChange={handleFormChange}
                              >
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                48. ¿A qué estrato pertenece esta vivienda? (Solicite recibo de servicio público, si lo tiene)
                              </CFormLabel>
                              <CFormSelect
                                id="estratoVivienda"
                                name="estratoVivienda"
                                value={formData.estratoVivienda}
                                onChange={handleFormChange}
                              >
                                <option value="">Seleccione una opción</option>
                                <option value={0}>Estrato 0</option>
                                <option value={1}>Estrato 1</option>
                                <option value={2}>Estrato 2</option>
                                <option value={3}>Estrato 3</option>
                                <option value={4}>Estrato 4</option>
                                <option value={5}>Estrato 5</option>
                                <option value={6}>6. Sin estratificación</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                        </CAccordionBody>
                      </CAccordionItem>
                      <CAccordionItem itemKey={2}>
                        <CAccordionHeader>II. CONDICIONES ECONOMICAS DE LA FAMILIA #2</CAccordionHeader>
                        <CAccordionBody>
                          {/* Pregunta 49 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                49. ¿En su vivienda se realiza algún trabajo o negocio que genere ingresos económicos?
                              </CFormLabel>
                              <CFormSelect
                                id="realizaTrabajoNegocioEnVivienda"
                                name="realizaTrabajoNegocioEnVivienda"
                                value={formData.realizaTrabajoNegocioEnVivienda}
                                onChange={handleFormChange}
                              >
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel> 49. ¿Cuál? </CFormLabel>
                              {/* Campo adicional si se selecciona "Sí" */}
                              {/* {formData.realizaTrabajoNegocioEnVivienda === 'S' && ( */}
                              <CFormInput
                                type="text"
                                id="realizaTrabajoNegocioEnViviendaCual"
                                name="realizaTrabajoNegocioEnViviendaCual"
                                placeholder="¿Cuál?"
                                value={formData.realizaTrabajoNegocioEnViviendaCual}
                                onChange={handleFormChange}
                                className="mt-2"
                              />
                              {/* )} */}
                            </CCol>
                          </CRow>
                          {/* Pregunta 50 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                50. ¿Cuáles son los ingresos mensuales promedio de la familia?
                              </CFormLabel>
                              <CFormSelect
                                id="ingresosMensualesPromedio"
                                name="ingresosMensualesPromedio"
                                value={formData.ingresosMensualesPromedio}
                                onChange={handleFormChange}
                              >
                                <option value="">Seleccione una opción</option>
                                <option value={1}>1. Menos de un Salario Mínimo Legal Vigente</option>
                                <option value={2}>2. 1 Salario Mínimo Legal Vigente</option>
                                <option value={3}>3. Más de 1 Salario Mínimo Legal Vigente</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                51. Mensualmente, ¿cuál es el promedio en gastos en servicios públicos en su familia?
                              </CFormLabel>
                              <CFormInput
                                type="text"
                                id="gastosMensualesServicios"
                                name="gastosMensualesServicios"
                                placeholder="Especifique el promedio de gastos"
                                value={formData.gastosMensualesServicios}
                                onChange={handleFormChange}
                              />
                            </CCol>
                          </CRow>
                        </CAccordionBody>
                      </CAccordionItem>
                      <CAccordionItem itemKey={3}>
                        <CAccordionHeader>III. CONDICIONES DE ENTORNO Y DE VIVIENDA #3</CAccordionHeader>
                        <CAccordionBody>
                          {/* Pregunta 52 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                52. Considera que desde su vivienda se puede acceder fácilmente a:
                              </CFormLabel>
                              <CFormCheck
                                type="checkbox"
                                id="medioTransporte"
                                name="medioTransporte"
                                label="Medios de transporte (Buses, autos, camiones, lanchas, etc.)"
                                checked={formData.accesoVivienda.medioTransporte === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'accesoVivienda')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="centroSociales"
                                name="centroSociales"
                                label="Centros sociales, culturales y/o recreacionales"
                                checked={formData.accesoVivienda.centroSociales === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'accesoVivienda')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="parques"
                                name="parques"
                                label="Parques, áreas deportivas y/o zonas verdes"
                                checked={formData.accesoVivienda.parques === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'accesoVivienda')}
                              />
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                53. ¿Cuánto tiempo promedio se gasta y cuál es la forma más frecuente en que se hace el desplazamiento desde su vivienda a la escuela o centro de estudio?
                              </CFormLabel>
                              <CFormCheck
                                type="checkbox"
                                id="apie"
                                name="apie"
                                label="A pie"
                                checked={formData.tiempoDesplazamiento.apie === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'tiempoDesplazamiento')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="bicicleta"
                                name="bicicleta"
                                label="En bicicleta"
                                checked={formData.tiempoDesplazamiento.bicicleta === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'tiempoDesplazamiento')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="vehiculoMotorizado"
                                name="vehiculoMotorizado"
                                label="En vehículo motorizado"
                                checked={formData.tiempoDesplazamiento.vehiculoMotorizado === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'tiempoDesplazamiento')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="caballo"
                                name="caballo"
                                label="En Mula/caballo/burro"
                                checked={formData.tiempoDesplazamiento.caballo === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'tiempoDesplazamiento')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="otro_53"
                                name="otro_53"
                                label="Otro"
                                checked={formData.tiempoDesplazamiento.otro_53 === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'tiempoDesplazamiento')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="noAplica"
                                name="noAplica"
                                label="No aplica"
                                checked={formData.tiempoDesplazamiento.noAplica === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'tiempoDesplazamiento')}
                              />
                              {/* {formData.otro && ( */}
                              <CFormInput
                                type="text"
                                id="especifiqueOtro_53"
                                name="especifiqueOtro_53"
                                placeholder="Especifique"
                                value={formData.especifiqueOtro_53}
                                onChange={handleFormChange}
                                className="mt-2"
                              />
                              {/* // )} */}
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                54. La cocina o sitio para preparar los alimentos es:
                              </CFormLabel>
                              <CFormSelect
                                id="sitioPreparaAlimientos"
                                name="sitioPreparaAlimientos"
                                value={formData.sitioPreparaAlimientos}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value={1}>1. De uso exclusivo de las personas de la familia</option>
                                <option value={2}>2. Compartida con personas de otras familias</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                55. ¿Cuál combustible usan para cocinar? (puede señalar varias opciones)
                              </CFormLabel>

                              <CFormCheck
                                type="checkbox"
                                id="electricidad"
                                name="electricidad"
                                label="Electricidad"
                                checked={formData.combustibleCocina.electricidad === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'combustibleCocina')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="gasPropano"
                                name="gasPropano"
                                label="Gas propano en cilindro"
                                checked={formData.combustibleCocina.gasPropano === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'combustibleCocina')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="gasNatural"
                                name="gasNatural"
                                label="Gas natural conectado a red pública"
                                checked={formData.combustibleCocina.gasNatural === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'combustibleCocina')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="lena"
                                name="lena"
                                label="Leña, madera o carbón de leña"
                                checked={formData.combustibleCocina.lena === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'combustibleCocina')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="petroleo"
                                name="petroleo"
                                label="Petróleo, gasolina, kerosén, alcohol"
                                checked={formData.combustibleCocina.petroleo === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'combustibleCocina')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="carbonMineral"
                                name="carbonMineral"
                                label="Carbón mineral"
                                checked={formData.combustibleCocina.carbonMineral === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'combustibleCocina')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="materiales"
                                name="materiales"
                                label="Materiales de desecho"
                                checked={formData.combustibleCocina.materiales === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'combustibleCocina')}
                              />
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                56. El servicio sanitario es:
                              </CFormLabel>
                              <CFormSelect
                                id="servicioSanitario"
                                name="servicioSanitario"
                                value={formData.servicioSanitario}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value={1}>1. De uso exclusivo de las personas de la familia</option>
                                <option value={2}>2. Compartido con personas de otras familias</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                57. ¿Cuáles de los siguientes servicios básicos domiciliarios tiene su vivienda?
                              </CFormLabel>
                              <CFormCheck
                                type="checkbox"
                                id="energiaElectrica"
                                name="energiaElectrica"
                                label="Energía eléctrica"
                                checked={formData.serviciosBasicos.energiaElectrica === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'serviciosBasicos')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="gasTuberia"
                                name="gasTuberia"
                                label="Gas por tubería"
                                checked={formData.serviciosBasicos.gasTuberia === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'serviciosBasicos')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="acueducto"
                                name="acueducto"
                                label="Acueducto"
                                checked={formData.serviciosBasicos.acueducto === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'serviciosBasicos')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="alcantarillado"
                                name="alcantarillado"
                                label="Alcantarillado"
                                checked={formData.serviciosBasicos.alcantarillado === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'serviciosBasicos')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="telefono_57"
                                name="telefono_57"
                                label="Teléfono"
                                checked={formData.serviciosBasicos.telefono_57 === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'serviciosBasicos')}
                              />
                              <CFormCheck
                                type="checkbox"
                                id="aseo"
                                name="aseo"
                                label="Aseo"
                                checked={formData.serviciosBasicos.aseo === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'serviciosBasicos')}
                              />
                            </CCol>
                          </CRow>

                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                58. ¿Está conforme con estos servicios prestados?
                              </CFormLabel>
                              <CFormSelect
                                id="conformeConServicios"
                                name="conformeConServicios"
                                value={formData.conformeConServicios}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel>
                                58. ¿Por qué?
                              </CFormLabel>
                              <CFormInput
                                type="text"
                                id="conformeConServiciosEspecifique"
                                name="conformeConServiciosEspecifique"
                                placeholder="¿Por qué?"
                                value={formData.conformeConServiciosEspecifique}
                                onChange={handleFormChange} />
                            </CCol>
                          </CRow>
                        </CAccordionBody>
                      </CAccordionItem>
                      <CAccordionItem itemKey={4}>
                        <CAccordionHeader>IV. SANEAMIENTO BÁSICO #4</CAccordionHeader>
                        <CAccordionBody>
                          {/* Pregunta 59 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                59. ¿De dónde toman principalmente el agua para consumir en la vivienda?
                              </CFormLabel>
                              <CFormSelect
                                id="fuenteAguaVivienda"
                                name="fuenteAguaVivienda"
                                value={formData.fuenteAguaVivienda}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value={1}>Acueducto público</option>
                                <option value={2}>Acueducto comunal o veredal</option>
                                <option value={3}>Pozo con bomba o aljibe</option>
                                <option value={4}>Laguna o jagüey</option>
                                <option value={5}>Río, quebrada o manantial</option>
                                <option value={6}>Aguas lluvias</option>
                                <option value={7}>Carro tanque</option>
                                <option value={8}>Agua embotellada</option>
                                <option value={9}>Otro. Especifique</option>
                              </CFormSelect>
                            </CCol>
                            {/* Campo adicional para especificar otra fuente */}
                            <CCol md={6}>
                              <CFormLabel>
                                59. especificar otra
                              </CFormLabel>
                              <CFormInput
                                type="text"
                                id="fuenteAguaViviendaEspecifique"
                                name="fuenteAguaViviendaEspecifique"
                                placeholder="Especifique otra fuente de agua"
                                value={formData.fuenteAguaViviendaEspecifique}
                                onChange={handleFormChange} />
                            </CCol>
                          </CRow>
                          {/* Pregunta 60 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                60. Ustedes obtienen el agua de esta forma con qué regularidad?
                              </CFormLabel>
                              <CFormSelect
                                id="obtieneAguaFormaRegular"
                                name="obtieneAguaFormaRegular"
                                value={formData.obtieneAguaFormaRegular}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value={1}>Permanente, es decir 24 horas al día </option>
                                <option value={2}>Horario establecido</option>
                                <option value={3}>De manera irregular</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                61. Antes de consumir verduras y frutas crudas, ¿las lavan?
                              </CFormLabel>
                              <CFormSelect
                                id="lavanFrutasVerduras"
                                name="lavanFrutasVerduras"
                                value={formData.lavanFrutasVerduras}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>

                          {/* Pregunta 62 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                62. ¿Acostumbran a encender velas/velones dentro de su vivienda?
                              </CFormLabel>
                              <CFormSelect
                                id="enciendenVelasVelones"
                                name="enciendenVelasVelones"
                                value={formData.enciendenVelasVelones}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                63. ¿Es frecuente que haya humo dentro de la vivienda? (Por cigarrillo, leña, carbón, etc.)
                              </CFormLabel>
                              <CFormSelect
                                id="humoDentroVivienda"
                                name="humoDentroVivienda"
                                value={formData.humoDentroVivienda}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                          {/* Pregunta 64 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">
                                64. ¿Usted o alguien de la familia se ha accidentado o lesionado en el último año en la vivienda?
                              </CFormLabel>
                              <CFormSelect
                                id="accidentadoEnVivienda"
                                name="accidentadoEnVivienda"
                                value={formData.accidentadoEnVivienda}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                        </CAccordionBody>
                      </CAccordionItem>
                      <CAccordionItem itemKey={5}>
                        <CAccordionHeader>V. SEGURIDAD Y ENTORNO DE LA VIVIENDA #5</CAccordionHeader>
                        <CAccordionBody>
                          {/* Pregunta 65 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">65. Tipo de vivienda</CFormLabel>
                              <CFormSelect
                                id="tipoVivienda"
                                name="tipoVivienda"
                                value={formData.tipoVivienda}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value={1}>Casa</option>
                                <option value={2}>Apartamento</option>
                                <option value={3}>Cuarto(s) en inquilinato</option>
                                <option value={4}>Improvisada (carpa, refugio natural, plásticos, etc) </option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel className="required-label">66. ¿La vivienda es auto construida?</CFormLabel>
                              <CFormSelect
                                id="viviendaAutoConstruida"
                                name="viviendaAutoConstruida"
                                value={formData.viviendaAutoConstruida}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                          {/* Pregunta 67 */}
                          <CRow className="mb-3">
                            <CCol md={12}>
                              <CFormLabel className="required-label">67. Topografía del terreno: La vivienda está ubicada sobre un terreno (puede señalar varias opciones)</CFormLabel>
                              <CFormCheck
                                type="checkbox"
                                id="plano"
                                name="plano"
                                label="a. Plano"
                                checked={formData.topografiaTerreno.plano === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'topografiaTerreno')} />
                              <CFormCheck
                                type="checkbox"
                                id="ladera"
                                name="ladera"
                                label="b. Ladera"
                                checked={formData.topografiaTerreno.ladera === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'topografiaTerreno')} />
                              <CFormCheck
                                type="checkbox"
                                id="relleno"
                                name="relleno"
                                label="c. Relleno"
                                checked={formData.topografiaTerreno.relleno === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'topografiaTerreno')} />
                              <CFormCheck
                                type="checkbox"
                                id="irregular"
                                name="irregular"
                                label="d. Irregular"
                                checked={formData.topografiaTerreno.irregular === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'topografiaTerreno')} />
                              <CFormCheck
                                type="checkbox"
                                id="inundable"
                                name="inundable"
                                label="e. Inundable"
                                checked={formData.topografiaTerreno.inundable === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'topografiaTerreno')} />
                              <CFormCheck
                                type="checkbox"
                                id="deslizamiento"
                                name="deslizamiento"
                                label="f. Deslizamiento"
                                checked={formData.topografiaTerreno.deslizamiento === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'topografiaTerreno')} />
                            </CCol>
                          </CRow>

                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">68. Observe si cerca de la vivienda hay: (puede señalar varias opciones)</CFormLabel>
                              <CFormCheck
                                type="checkbox"
                                id="terrenoBaldios"
                                name="terrenoBaldios"
                                label="1. Terrenos baldíos"
                                checked={formData.lugaresVivienda.terrenoBaldios === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'lugaresVivienda')} />
                              <CFormCheck
                                type="checkbox"
                                id="plagas"
                                name="plagas"
                                label="2. Plagas: roedores, cucarachas, zancudos, moscas, etc."
                                checked={formData.lugaresVivienda.plagas === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'lugaresVivienda')} />
                              <CFormCheck
                                type="checkbox"
                                id="industria"
                                name="industria"
                                label="3. Industrias contaminantes"
                                checked={formData.lugaresVivienda.industria === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'lugaresVivienda')} />
                              <CFormCheck
                                type="checkbox"
                                id="porquerizas"
                                name="porquerizas"
                                label="4. Porquerizas"
                                checked={formData.lugaresVivienda.porquerizas === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'lugaresVivienda')} />
                              <CFormCheck
                                type="checkbox"
                                id="malosOlores"
                                name="malosOlores"
                                label="5. Malos olores"
                                checked={formData.lugaresVivienda.malosOlores === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'lugaresVivienda')} />
                              <CFormCheck
                                type="checkbox"
                                id="rellenos"
                                name="rellenos"
                                label="6. Rellenos sanitarios/botaderos"
                                checked={formData.lugaresVivienda.rellenos === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'lugaresVivienda')} />
                              <CFormCheck
                                type="checkbox"
                                id="contaminacionAuditiva"
                                name="contaminacionAuditiva"
                                label="7. Contaminación auditiva"
                                checked={formData.lugaresVivienda.contaminacionAuditiva === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'lugaresVivienda')} />
                              <CFormCheck
                                type="checkbox"
                                id="contaminacionVisual"
                                name="contaminacionVisual"
                                label="8. Contaminación visual"
                                checked={formData.lugaresVivienda.contaminacionVisual === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'lugaresVivienda')} />
                              <CFormCheck
                                type="checkbox"
                                id="rio"
                                name="rio"
                                label="9. Río o quebrada"
                                checked={formData.lugaresVivienda.rio === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'lugaresVivienda')} />
                              <CFormCheck
                                type="checkbox"
                                id="especifique"
                                name="especifique"
                                label="10. Otro"
                                checked={formData.lugaresVivienda.especifique === 'S'}
                                onChange={(e) => handleCheckboxChange(e, 'lugaresVivienda')} />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel>68. Especifique Otro</CFormLabel>
                              <CFormInput
                                type="text"
                                id="especifiqueOtro_68"
                                name="especifiqueOtro_68"
                                placeholder="Especifique"
                                value={formData.especifiqueOtro_68}
                                onChange={handleFormChange}
                                className="mt-2" />
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">69. ¿Cerca de la vivienda hay zonas recreativas, zonas verdes y/o de esparcimiento?</CFormLabel>
                              <CFormSelect
                                id="zonasRecreativas"
                                name="zonasRecreativas"
                                value={formData.zonasRecreativas}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                        </CAccordionBody>
                      </CAccordionItem>
                      <CAccordionItem itemKey={6}>
                        <CAccordionHeader>VI. CONDICIONES DE LA VIVIENDA #6</CAccordionHeader>
                        <CAccordionBody>
                          {/* Pregunta 70 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">70. Pisos: ¿cuál es el material predominante del piso? (Señale una sola opción)</CFormLabel>
                              <CFormSelect
                                id="materialPredominantePiso"
                                name="materialPredominantePiso"
                                value={formData.materialPredominantePiso}
                                onChange={handleFormChange}
                              >
                                <option value="">Seleccione una opción</option>
                                <option value="1">Liso e impermeable (cemento, baldosa, ladrillo, tableta, granito)</option>
                                <option value="2">Madera burda, tabla, tablón, otro vegetal</option>
                                <option value="3">Madera pulida</option>
                                <option value="4">Material plástico (vinilo, otro material sintético)</option>
                                <option value="5">Lámina</option>
                                <option value="6">Esterilla</option>
                                <option value="7">Tierra, arena</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel className="required-label">71. Paredes: ¿cuál es el material predominante de las paredes? (Señale una sola opción)</CFormLabel>
                              <CFormSelect
                                id="materialPredominanteParedes"
                                name="materialPredominanteParedes"
                                value={formData.materialPredominanteParedes}
                                onChange={handleFormChange}
                              >
                                <option value="">Seleccione una opción</option>
                                <option value={1}>Impermeable (cemento, bloque, ladrillo, piedra)</option>
                                <option value={2}>Bahareque/Barro, tapia pisada, esterilla, caña, otro tipo de Material vegetal</option>
                                <option value={3}>Madera pulida, Madera burda (tabla, tablón), Guadua</option>
                                <option value={4}>Otro. Especifique</option>
                                <option value={5}>No tiene</option>
                              </CFormSelect>
                              {/* {formData.materialPredominanteParedes === "4" && ( */}
                              <CFormInput
                                type="text"
                                id="materialPredominanteParedesEspecifique"
                                name="materialPredominanteParedesEspecifique"
                                placeholder="Especifique el material"
                                value={formData.materialPredominanteParedesEspecifique}
                                onChange={handleFormChange}
                                className="mt-2"
                              />
                              {/* // )} */}
                            </CCol>
                          </CRow>

                          {/* Pregunta 72 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">72. Techo: ¿cuál es el material predominante del techo? (Señale una sola opción)</CFormLabel>
                              <CFormSelect
                                id="materialPredominanteTecho"
                                name="materialPredominanteTecho"
                                value={formData.materialPredominanteTecho}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value={1}>Concreto</option>
                                <option value={2}>Tejas de barro</option>
                                <option value={3}>Fibrocemento</option>
                                <option value={4}>Zinc</option>
                                <option value={5}>Palma o paja</option>
                                <option value={6}>Plástico</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={12}>
                              <CFormLabel className="required-label">73. La vivienda tiene los siguientes ambientes separados? (Conteste Sí, No o NA)</CFormLabel>
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={4}>
                              <CFormLabel htmlFor="cocina_73">a. Cocina</CFormLabel>
                              <CFormSelect
                                id="cocina_73"
                                name="cocina_73"
                                value={formData.cocina_73}
                                onChange={handleFormChange}
                                className="mb-2">
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                                <option value="NA">NA</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                              <CFormLabel htmlFor="dormitorioAdulto_73">b. Dormitorio adultos</CFormLabel>
                              <CFormSelect
                                id="dormitorioAdulto_73"
                                name="dormitorioAdulto_73"
                                value={formData.dormitorioAdulto_73}
                                onChange={handleFormChange}
                                className="mb-2">
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                                <option value="NA">NA</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                              <CFormLabel htmlFor="sala_73">c. Sala / Comedor</CFormLabel>
                              <CFormSelect
                                id="sala_73"
                                name="sala_73"
                                value={formData.sala_73}
                                onChange={handleFormChange}
                                className="mb-2">
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                                <option value="NA">NA</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={4}>
                              <CFormLabel htmlFor="dormitorioNinos_73">d. Dormitorio niños</CFormLabel>
                              <CFormSelect
                                id="dormitorioNinos_73"
                                name="dormitorioNinos_73"
                                value={formData.dormitorioNinos_73}
                                onChange={handleFormChange}
                                className="mb-2">
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                                <option value="NA">NA</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                              <CFormLabel htmlFor="sanitario_73">e. Sanitario</CFormLabel>
                              <CFormSelect
                                id="sanitario_73"
                                name="sanitario_73"
                                value={formData.sanitario_73}
                                onChange={handleFormChange}
                                className="mb-2">
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                                <option value="NA">NA</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                              <CFormLabel htmlFor="lavadero_73">f. Lavadero techado</CFormLabel>
                              <CFormSelect
                                id="lavadero_73"
                                name="lavadero_73"
                                value={formData.lavadero_73}
                                onChange={handleFormChange}
                                className="mb-2">
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                                <option value="NA">NA</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                          {/* Pregunta 74 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">74. ¿De cuántos cuartos o piezas dormitorio dispone este hogar?</CFormLabel>
                              <CFormInput
                                type="number"
                                id="numeroCuartosHogar"
                                name="numeroCuartosHogar"
                                value={formData.numeroCuartosHogar}
                                onChange={handleFormChange} />
                            </CCol>
                            <CCol md={12}>
                              <CFormLabel className="required-label">75. Observe en dónde duermen las personas de la vivienda: (Puede señalar varias opciones)</CFormLabel>
                              {['cama', 'estera', 'camasinColchon', 'hamaca', 'colchon', 'otro_75'].map((field, index) => (
                                <CFormCheck
                                  key={index}
                                  type="checkbox"
                                  id={field}
                                  name={field}
                                  label={field === 'otro_75' ? 'otro' : field}
                                  checked={formData.duermenVivienda[field] === 'S'}
                                  onChange={(e) => handleCheckboxChange(e, 'duermenVivienda')} />
                              ))}
                              {/* Campo adicional para especificar */}
                              {/* {formData.otro && ( */}
                              <CFormInput
                                type="text"
                                id="cualOtro_75"
                                name="cualOtro_75"
                                placeholder="Especifique"
                                value={formData.cualOtro_75}
                                onChange={handleFormChange}
                                className="mt-2"
                              />
                              {/* )} */}
                            </CCol>
                          </CRow>
                          {/* Pregunta 76 */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel className="required-label">76. ¿Cuántas camas hay en la vivienda?</CFormLabel>
                              <CFormInput
                                type="number"
                                id="numeroCamasVivienda"
                                name="numeroCamasVivienda"
                                value={formData.numeroCamasVivienda}
                                onChange={handleFormChange}
                              />
                            </CCol>
                          </CRow>
                          {/* Pregunta 77 */}
                          <CRow className="mb-3">
                            <CCol md={12}>
                              <CFormLabel className="required-label">77. ¿La casa cuenta con los siguientes elementos por separado? (Conteste Sí, No o NA)</CFormLabel>
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol md={12}>
                              <CFormLabel htmlFor="lavamanos_77">a. Lavamanos</CFormLabel>
                              <CFormSelect
                                id="lavamanos_77"
                                name="lavamanos_77"
                                value={formData.lavamanos_77}
                                onChange={handleFormChange}
                                className="mb-2">
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                                <option value="NA">NA</option>
                              </CFormSelect>
                              <CFormLabel htmlFor="lavaplatos_77">b. Lavaplatos</CFormLabel>
                              <CFormSelect
                                id="lavaplatos_77"
                                name="lavaplatos_77"
                                value={formData.lavaplatos_77}
                                onChange={handleFormChange}
                                className="mb-2">
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                                <option value="NA">NA</option>
                              </CFormSelect>
                              <CFormLabel htmlFor="lavaRopa_77">c. Lavadero de ropa</CFormLabel>
                              <CFormSelect
                                id="lavaRopa_77"
                                name="lavaRopa_77"
                                value={formData.lavaRopa_77}
                                onChange={handleFormChange}
                                className="mb-2">
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                                <option value="NA">NA</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                        </CAccordionBody>
                      </CAccordionItem>
                      <CAccordionItem itemKey={7}>
                        <CAccordionHeader>VII. MANEJO DE EXCRETAS: #7</CAccordionHeader>
                        <CAccordionBody>
                          {/* Preguntas 78 y 79 (primera fila) */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="lugarDisponenExcretas" className="required-label">78. Observe en dónde se disponen las excretas (heces)</CFormLabel>
                              <CFormSelect
                                id="lugarDisponenExcretas"
                                name="lugarDisponenExcretas"
                                value={formData.lugarDisponenExcretas}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value={1}>1. Inodoro conectado a alcantarillado</option>
                                <option value={2}>2. Inodoro conectado a pozo séptico o sumidero</option>
                                <option value={3}>3. Inodoro con descarga al aire libre</option>
                                <option value={4}>4. Letrina o sumidero</option>
                                <option value={5}>5. Campo abierto</option>
                              </CFormSelect>
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="numeroSanitariosHogar" className="required-label">79. ¿Cuántos inodoros o sanitarios de arrastre tiene este hogar?</CFormLabel>
                              <CFormSelect
                                id="numeroSanitariosHogar"
                                name="numeroSanitariosHogar"
                                value={formData.numeroSanitariosHogar}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value={1}>1. Ninguno</option>
                                <option value={2}>2. Uno</option>
                                <option value={3}>3. Dos</option>
                                <option value={4}>4. Más de 2</option>
                                <option value={5}>5. No aplica</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                          {/* Preguntas 80 y 81 (segunda fila) */}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="lugarSanitario" className="required-label">80. ¿Dónde se encuentra el sanitario, inodoro o letrina que usan las personas de esta familia?</CFormLabel>
                              <CFormSelect
                                id="lugarSanitario"
                                name="lugarSanitario"
                                value={formData.lugarSanitario}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="a">a. Fuera de la casa</option>
                                <option value="b">b. Dentro de la casa, pero fuera del área habitada (patio o solar)</option>
                                <option value="c">c. Dentro de la casa</option>
                                <option value="d">d. No aplica</option>
                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="lavamanosCercaSanitario" className="required-label">81. ¿El lavamanos se encuentra cerca del sanitario?</CFormLabel>
                              <CFormSelect
                                id="lavamanosCercaSanitario"
                                name="lavamanosCercaSanitario"
                                value={formData.lavamanosCercaSanitario}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="S">Si</option>
                                <option value="N">No</option>
                                <option value="NA">No aplica</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                        </CAccordionBody>
                      </CAccordionItem>
                      <CAccordionItem itemKey={8}>
                        <CAccordionHeader>VIII. MANEJO DE BASURAS Y RESIDUOS SÓLIDOS EN LA VIVIENDA #8</CAccordionHeader>
                        <CAccordionBody>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="recogenBasura" className="required-label">82. Recogen la basura en:</CFormLabel>
                              <CFormSelect
                                id="recogenBasura"
                                name="recogenBasura"
                                value={formData.recogenBasura}
                                onChange={handleFormChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="1">1. Recipientes con tapa</option>
                                <option value="2">2. Recipientes sin tapa</option>
                                <option value="3">3. Directamente al suelo</option>
                              </CFormSelect>
                            </CCol>
                          </CRow>
                          <CAccordion>
                            <CAccordionItem itemKey={100}>
                              <CAccordionHeader>DATOS DE SEGUIMIENTO EN EL HOGAR #1</CAccordionHeader>
                              <CAccordionBody>
                                <CRow className="mb-3">
                                  <CCol md={6}>
                                    <CFormLabel htmlFor="nombreCompletoSeguimientoHogar" className="required-label">83. Nombre completo de la persona:</CFormLabel>
                                    <CFormInput
                                      type="text"
                                      id="nombreCompletoSeguimientoHogar"
                                      name="nombreCompletoSeguimientoHogar"
                                      value={formData.nombreCompletoSeguimientoHogar}
                                      onChange={handleFormChange} />
                                  </CCol>
                                  <CCol md={6}>
                                    <CFormLabel htmlFor="direccionViviendaSeguimientoHogar" className="required-label">84. Dirección o nombre de la finca o vivienda donde vive la persona: barrio o vereda</CFormLabel>
                                    <CFormInput
                                      type="text"
                                      id="direccionViviendaSeguimientoHogar"
                                      name="direccionViviendaSeguimientoHogar"
                                      value={formData.direccionViviendaSeguimientoHogar}
                                      onChange={handleFormChange} />
                                  </CCol>
                                  <CCol md={6}>
                                    <CFormLabel htmlFor="telefonoViviendaSeguimientoHogar" className="required-label">84. Teléfono:</CFormLabel>
                                    <CFormInput
                                      type="text"
                                      id="telefonoViviendaSeguimientoHogar"
                                      name="telefonoViviendaSeguimientoHogar"
                                      value={formData.telefonoViviendaSeguimientoHogar}
                                      onChange={handleFormChange} />
                                  </CCol>
                                </CRow>
                              </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={200}>
                              <CAccordionHeader>OBSERVACIONES DEL ENCUESTADOR #2</CAccordionHeader>
                              <CAccordionBody>
                                <CRow className="mb-3">
                                  <CCol md={122}>
                                    <CFormLabel htmlFor="observacionesEncuestador">Observaciones del encuestador:</CFormLabel>
                                    <CFormTextarea
                                      id="observacionesEncuestador"
                                      name="observacionesEncuestador"
                                      rows="4"
                                      value={formData.observacionesEncuestador}
                                      onChange={handleFormChange} />
                                  </CCol>
                                </CRow>
                              </CAccordionBody>
                            </CAccordionItem>
                          </CAccordion>
                        </CAccordionBody>
                      </CAccordionItem>
                    </CAccordion>
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={6}>
                  <CAccordionHeader>E. TRATAMIENTO DE DATOS PERSONALES #6</CAccordionHeader>
                  <CAccordionBody>
				            <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormLabel htmlFor="autorizacionTratamientoDatos" className="required-label">85. ¿Autoriza el tratamiento de datos personales?</CFormLabel>
                        <CFormSelect
                          id="autorizacionTratamientoDatos"
                          name="autorizacionTratamientoDatos"
                          value={formData.autorizacionTratamientoDatos}
                          onChange={handleFormChange}>
                          <option value="">Seleccione opción</option>
                          <option value="N">No</option>
                          <option value="S">Sí</option>
                        </CFormSelect>
                       </CCol>
                          <CCol md={6}>
                            <CFormLabel>85. Seleccione el archivo PDF</CFormLabel>
                            <CFormInput
                              type="file"
                              id="formFile"
                              name="formFile" />
                          </CCol>
                        </CRow>
					             <CRow className="mb-3">
                          <CCol md={6}>
                            <CFormLabel htmlFor="autorizacionUsoImagen" className="required-label">86. ¿Autoriza el uso de imagen?</CFormLabel>
                            <CFormSelect
                              id="autorizacionUsoImagen"
                              name="autorizacionUsoImagen"
                              value={formData.autorizacionUsoImagen}
                              onChange={handleFormChange} >
                              <option value="">Seleccione opción</option>
                              <option value="N">No</option>
                              <option value="S">Sí</option>
                            </CFormSelect>
                          </CCol>
                          <CCol md={6}>
                            <CFormLabel>86. Seleccione el archivo PDF</CFormLabel>
                            <CFormInput
                              type="file"
                              id="formFile2"
                              name="formFile2" />
                          </CCol>
                        </CRow>
				        </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
              <CButton color="primary" onClick={ !readOnly ? handleSave : undefined }>
                Guardar
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default FormControl
