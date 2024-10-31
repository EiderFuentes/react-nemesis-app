import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { MiembrosFamilia } from './miembros-familia.entity';
import { Desplazamiento } from './desplazamiento.entity';
import { TiempoCasa } from './tiempo-casa.entity';
import { TiempoLibre } from './tiempo-libre.entity';
import { AccesoVivienda } from './acceso-vivienda.entity';
import { Conviven } from './conviven.entity';
import { TiempoDesplazamiento } from './tiempo-desplazamiento.entity';
import { TopografiaTerreno } from './topografia-terreno.entity';
import { LugaresVivienda } from './lugares-vivienda.entity';
import { DuermenVivienda } from './duermen-vivienda.entity';
import { CombustibleCocina } from './combustible-cocina.entity';
import { ServiciosBasicos } from './servicios-basicos.entity';
import { AmbientesSeparados } from './ambientes-separados.entity';
import { ElementosCasa } from './elementos-casa.entity';
@Entity({ name: `caracterizacion` })
@Unique(['identificacion']) 
export class Caracterizacion {
    @PrimaryGeneratedColumn()
    id: number;

    //---------------------------  A. Control de calidad de la encuesta
    @Column({ comment: `1. Nombre del Encuestador` })
    nombreEncuestador: string;

    @Column({ comment: `2. Fecha` })
    fechaEncuesta: string;

    @Column({ nullable: true, comment: `3. Hora Inicio` })
    horaInicioEncuesta?: string;

    @Column({ nullable: true, comment: `4. Hora Culminación` })
    horaFinEncuesta?: string;

    @Column({ nullable: true, comment: `5. Supervisor` })
    nombreSupervisorEncuestador?: string;
    //---------------------------  B. Datos generales
    //---------------------------  I. Identificación
    @Column({ comment: `6. Identificacion del Encuestado(a)` })
    identificacion: string;

    @Column({ comment: `6. Nombre y Apellidos Encuestado(a)` })
    nombreApellido: string;

    @Column({ type: 'enum', enum: ['F', 'M'], comment: `7. Sexo M-F` })
    sexo: string;

    @Column({ comment: `8. Edad` })
    edad: string;

    @Column({ comment: `9. Dirección (o nombre de la finca y verda)` })
    direccion: string;

    @Column({ comment: `10. Barrio` })
    barrio: string;

    @Column({ comment: `10. Municipio` })
    municipio: string;

    @Column({ comment: `11. Teléfono` })
    telefono: string;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `12. ¿Usted o su familia pertenecen a alguna organización comunitaria y/o participan en algún proyecto comunitario especifico?` })
    organizacionComunitariaProyecto: string; //N-S

    @Column({ comment: `12. Si, Cuál?` })
    cualOrganizacionComunitariaProyecto: string;

    //--------------------------------------------- II Total de personas en la vivienda
    @Column({ comment: `13. ¿Cuántas personas viven en la vivienda?` })
    totalPersonasVivienda: number;

    @Column({ comment: `14. ¿Cuántas familias residen de manera habitual en esta vivienda?` })
    totalFamiliasVivienda: number;
    //--------------------------------------------- III Miembros de familia
    //--------------------- SECCION NUMERO DE PERSONAS EN LA FAMILIA 
    @OneToMany(() => MiembrosFamilia, (miembro) => miembro.caracterizacion, { cascade: true })
    miembrosFamilia: MiembrosFamilia[];

    //---------------------------  C. Encuesta psicosocial
    @Column({ type: 'enum', enum: ['N', 'S'], comment: `26. ¿En los últimos dos años usted y su familia han recibido algún tipo de ayuda o apoyo de alguna entidad u organización?` }) // bool
    haRecibidoAyuda: string; // N-S

    @Column({ nullable: true, comment: `26. Si, ¿de cuál organización, institución o persona?` })
    nombreAyudaOrganizacion?: string;

    @Column({ nullable: true, comment: `26. ¿Qué tipo de ayuda?` })
    tipoAyuda?: string;

    @Column({ comment: `27. ¿En la actualidad cuál considera que es la principal necesidad que tienen usted y su familia? ` })
    principalNecesidad: string;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `28. ¿Ha sido usted y/o su familia desplazados por la violencia en los últimos diez años?` }) // bool
    haSidoDesplazado: string; //N-S

    @Column({ nullable: true, comment: `28. 1.Si Hace cuánto tiempo?` })
    haceCuantoTiempoDesplazado?: string;

    @Column({ nullable: true, comment: `28. ¿De qué lugar?` })
    lugarDeDesplazado?: string;

    @Column({ type: 'enum', enum: ['N', 'S'], nullable: true, comment: `29. ¿Siente deseos de volver al sitio de donde fue desplazado?` })
    deseaVolverAlSitioDeDesplazado?: string; //N-S

    @Column({ nullable: true, comment: `29. ¿Por qué?` })
    porqueSiNoDesea?: string;

    @Column({ type: 'enum', enum: ['N', 'S'], nullable: true, comment: `30. Después del desplazamiento usted o su familia han sido rechazados o discriminados?` })// booll
    haSidoRechazadoDespuesDeDesplazado?: string; //N-S

    // ------------------------------------------------------
    // Se debe crear otra tabla para guardar los datos
    // 31. ¿Qué cambios ha presentado la familia después del desplazamiento? (puede señalar varias opciones)
    @OneToMany(() => Desplazamiento, (desp) => desp.caracterizacion, { cascade: true })
    desplazamiento: Desplazamiento[];

    @Column({ nullable: true, comment: `32. ¿Qué tan afectados de manera negativa considera que están usted y su familia como consecuencia del desplazamiento?` })
    afectadoConsecuenciaDesplazamiento?: number;

    @Column({ nullable: true, comment: `33. ¿Considera que el desplazamiento ha sido en alguna manera positiva para usted y su familia?` })
    haSidoPositivoElDesplazamiento?: number;

    // ------------------------------------------------------
    // Se debe crear otra tabla para guardar los datos
    // 34. ¿Cuándo su familia se encuentra dentro de la casa,  qué lugar prefieren estar la mayor parte del tiempo? (puede señalar varias opciones) 
    @OneToMany(() => TiempoCasa, (lug) => lug.caracterizacion, { cascade: true })
    tiempoCasa: TiempoCasa[];

    @Column({ comment: `35. Cuándo consumen los alimentos en su familia, lo hacen:` })
    comoConsumenLosAlimentos: number;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `36. ¿Al interior de su familia se presentan o se han presentado casos de maltrato o violencia?` })
    maltratoViolenciaEnLaFamilia: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], nullable: true, comment: `37. En caso de responder SI a la anterior pregunta ¿Ha pedido ayuda o ha denunciado estos casos?` })
    haPedidoAyudaDenunciado?: string; //N-S

    @Column({ nullable: true, comment: `37. ¿Por qué.?` })
    haPedidoAyudaDenunciadoPorQue?: string;

    @Column({ comment: `38. ¿Cómo se toman las decisiones más importantes en su familia.?` })
    decisionesImportantesEnFamilia: number;

    @Column({ nullable: true, comment: `38. Otro. Especifique` })
    decisionesFamilia?: string;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `39. ¿Se siente a gusto en la vivienda que habita actualmente.?` })
    seSienteAgustoEnLaVivienda: string; //N-S

    @Column({ comment: `39. ¿Qué es lo que más le gusta? - ¿Qué es lo que menos le gusta? ` })
    seSienteAgustoEnLaViviendaPorQue: string;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `40. ¿Considera que necesita capacitarse?` })
    necesitaCapacitarse: string; //N-S

    @Column({ comment: `40.  ¿En qué? -  ¿Por qué?` })
    necesitaCapacitarseEspecifique: string;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `41. ¿Le gustaría emprender un negocio?` })
    emprenderNegocio: string; //N-S

    @Column({ comment: `41. ¿De qué? - o ¿Por qué?` })
    emprenderNegocioEspecifique: string;

    @Column({ comment: `42. ¿Cómo cree que serán las condiciones de vida de usted y su familia en un año?` })
    condicionesDeVida: number;

    // ------------------------------------------------------ Se debe guardar en otra tabla
    // Se debe crear otra tabla para guardar los datos
    // 43. Usted o alguien de la familia que convive con usted: (puede señalar varias opciones) a. Fuma cigarrillo y/o tabaco?
    @OneToMany(() => Conviven, (con) => con.caracterizacion, { cascade: true })
    conviven: Conviven[];

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `44. Consume medicamentos para dormir y/o calmar los nervios?` })
    consumeMedicamentos: string; //N-S

    // ------------------------------------------------------
    // Se debe crear otra tabla para guardar los datos
    // 45. ¿A qué dedica su familia el tiempo libre? (puede señalar varias opciones)
    @OneToMany(() => TiempoLibre, (tie) => tie.caracterizacion, { cascade: true })
    tiempoLibre: TiempoLibre[];
    //-------------------------------------------------------------
    //  DIAGNÓSTICO DE LAS CONDICIONES SANITARIAS DE LA VIVIENDA A NIVEL FAMILIAR
    //----------------------------- D. VIVIENDA
    //I. TENENCIA DE LA VIVIENDA
    @Column({ comment: `46. La vivienda ocupada por este hogar es:` })
    viviendaOcupada: number;

    @Column({ nullable: true, comment: `46. Otra. Especifique -  $valor` })
    viviendaOcupadaEspecifique?: string;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `47. El lote donde está ubicada la vivienda es legalizado:` })
    loteViviendaLegal: string; //N-S

    @Column({ comment: `48. ¿A qué estrato pertenece esta vivienda? (Solicite recibo de servicio público, si lo tiene)` })
    estratoVivienda: number;

    //-------------------------------------------------------------
    //II. CONDICIONES DE LA VIVIENDA
    @Column({ type: 'enum', enum: ['N', 'S'], comment: `49 ¿En su vivienda se realiza algún trabajo o negocio que genere ingresos económicos?` })
    realizaTrabajoNegocioEnVivienda: string; //N-S

    @Column({ nullable: true, comment: `49 si, ¿Cuál?` })
    realizaTrabajoNegocioEnViviendaCual?: string;

    @Column({ comment: `50. ¿Cuáles son los ingresos mensuales promedio de la familia?` })
    ingresosMensualesPromedio: number;

    @Column({ comment: `51. Mensualmente, ¿cuál es el promedio en gastos en servicios públicos en su familia? ` })
    gastosMensualesServicios: string;

    //------------------------------------------------------------
    //III. CONDICIONES DE ENTORNO Y DE VIVIENDA
    // Se crea otra tabla para guardar los datos
    // 52. Considera que desde su vivienda se puede acceder fácilmente a: (puede señalar varias opciones)
    @OneToMany(() => AccesoVivienda, (acce) => acce.caracterizacion, { cascade: true })
    accesoVivienda: AccesoVivienda[];

    // ------------------------------------------------------
    // Se crea otra tabla para guardar los datos
    //53. ¿Cuánto tiempo promedio se gasta y cuál es la forma más frecuente en que se hace el desplazamiento desde su vivienda a la escuela o centro de estudio?: (puede señalar Varias opciones)
    @OneToMany(() => TiempoDesplazamiento, (tiem) => tiem.caracterizacion, { cascade: true })
    tiempoDesplazamiento: TiempoDesplazamiento[];

    @Column({ comment: `54. La cocina o sitio para preparar los alimentos es:` })
    sitioPreparaAlimientos: number;

    // ------------------------------------------------------
    // Se crea otra tabla para guardar los datos
    //55. ¿Cuál combustible usan para cocinar? (puede señalar varias opciones)
    @OneToMany(() => CombustibleCocina, (com) => com.caracterizacion, { cascade: true })
    combustibleCocina: CombustibleCocina[];

    @Column({ comment: ` 56. El servicio sanitario es:` })
    servicioSanitario: number;

    // ------------------------------------------------------
    // Se crea otra tabla para guardar los datos
    //57. ¿Cuáles de los siguientes servicios básicos domiciliarios tiene su vivienda?
    @OneToMany(() => ServiciosBasicos, (com) => com.caracterizacion, { cascade: true })
    serviciosBasicos: ServiciosBasicos[];

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `58. ¿Está conforme con estos servicios prestados? si-no` })
    conformeConServicios: string; //N-S

    @Column({ comment: `58. ¿por qué?` })
    conformeConServiciosEspecifique: string;

    //------------------------------------------------------------
    //IV. SANEAMIENTO BÁSICO
    //AGUA PARA EL CONSUMO HUMANO

    @Column({ comment: `59. ¿De dónde toman principalmente el agua para consumir en la vivienda?` })
    fuenteAguaVivienda: number;

    @Column({ nullable: true, comment: `59. 9 Otro. Especifique` })
    fuenteAguaViviendaEspecifique?: string;

    @Column({ comment: `60. Ustedes obtienen el agua de esta forma con qué regularidad?` })
    obtieneAguaFormaRegular: number;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `61. Antes de consumir verduras y frutas crudas ¿las lavan?` })
    lavanFrutasVerduras: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `62. ¿Acostumbran a encender velas/velones dentro de su vivienda?` })
    enciendenVelasVelones: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `63. ¿Es frecuente que haya humo dentro de la vivienda? (Por cigarrillo, leña, carbón, etc.)` })
    humoDentroVivienda: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `64. ¿Usted o alguien de la familia se ha accidentado o lesionado en el último año en la vivienda?` })
    accidentadoEnVivienda: string; //N-S

    //--------------------------------------------------------------------------
    // DIAGNÓSTICO DE LAS CONDICIONES SANITARIAS DE LA VIVIENDA A NIVEL FAMILIAR
    // V. SEGURIDAD ENTORNO VIVIENDA
    @Column({ comment: `65. Tipo de vivienda` })
    tipoVivienda: number;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `66. ¿La vivienda es auto construido?` })
    viviendaAutoConstruida: string; //N-S

    // ------------------------------------------------------
    // Se crea otra tabla para guardar los datos
    // 67. Topografía del terreno: La vivienda está ubicada sobre un terreno (puede señalar varias opciones)
    @OneToMany(() => TopografiaTerreno, (top) => top.caracterizacion, { cascade: true })
    topografiaTerreno: TopografiaTerreno[];

    // ------------------------------------------------------
    // Se crea otra tabla para guardar los datos
    // 68. Observe si cerca de la vivienda hay: (puede señalar varias opciones:
    @OneToMany(() => LugaresVivienda, (viv) => viv.caracterizacion, { cascade: true })
    lugaresVivienda: LugaresVivienda[];

    @Column({ type: 'enum', enum: ['N', 'S'], comment: ` 69. ¿Cerca de la vivienda hay zonas recreativas, zonas verdes y/o de esparcimiento?` })
    zonasRecreativas: string; //N-S

    // ------------------------------------------------------
    // VI. SEGURIDAD ENTORNO VIVIENDA
    @Column({ comment: `70.Pisos ¿cuál es el material predominante del piso (Señale una sola opción) ` })
    materialPredominantePiso: string;

    @Column({ comment: `71. Paredes: ¿cuál es el material predominante de las paredes? (Señale una sola opción) ` })
    materialPredominanteParedes: number;

    @Column({ nullable: true, comment: `71. . Otro. Especifique` })
    materialPredominanteParedesEspecifique?: string;

    @Column({ comment: `72. Techo: ¿cuál es el material predominante del techo?(señale una sola opción` })
    materialPredominanteTecho: number;

    // ------------------------------------------------------
    // Se crea otra tabla para guardar los datos
    //73. La vivienda tiene los siguientes ambientes separados? Conteste SI O NO, para cada opción, según observe
    @OneToMany(() => AmbientesSeparados, (amb) => amb.caracterizacion, { cascade: true })
    ambientesSeparados: AmbientesSeparados[];
    //-----------------------------------

    @Column({ comment: `74. ¿De cuántos cuartos o piezas dormitorio, dispone este hogar?` })
    numeroCuartosHogar: number;

    // ------------------------------------------------------
    //75. Observe en dónde duermen las personas de la vivienda: (Puede señalar varias opciones)
    @OneToMany(() => DuermenVivienda, (due) => due.caracterizacion, { cascade: true })
    duermenVivienda: DuermenVivienda[];

    @Column({ comment: `76. Cuántas camas hay en la vivienda? ` })
    numeroCamasVivienda: number;

    // ------------------------------------------------------   
    // 77 ¿La casa cuenta con los siguientes elementos por separado?:
    @OneToMany(() => ElementosCasa, (due) => due.caracterizacion, { cascade: true })
    elementosCasa: ElementosCasa[];

    // VII. MANEJO DE EXCRETAS
    @Column({ comment: `78. Observe en dónde se disponen las excretas (heces)` })
    lugarDisponenExcretas: number;

    @Column({ comment: `79. ¿Cuántos inodoros o sanitarios de arrastre tiene este hogar?:` })
    numeroSanitariosHogar: number;

    @Column({ comment: `80. Dónde se encuentra el sanitario, inodoro o letrina que usan las personas de esta familia?` })
    lugarSanitario: string;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `81. ¿El lavamanos se encuentra cerca del sanitario?` })
    lavamanosCercaSanitario: string; //N-S

    // ------------------------------------------------------
    //VIII. MANEJO DE BASURAS Y RESIDUOS SÓLIDOS EN LA VIVIENDA
    @Column({ comment: `82.. Recogen la basura en:` })
    recogenBasura: number;

    // ------------------------------------------------------
    // DATOS DE SEGUIMIENTO EN EL HOGAR
    @Column({ nullable: true, comment: `83. Nombre completo de la persona: ` })
    nombreCompletoSeguimientoHogar?: string;

    @Column({ comment: `84 dirección o nombre de la finca o vivienda donde vive la persona: barrio o vereda` })
    direccionViviendaSeguimientoHogar: string;

    @Column({ nullable: true, comment: `84 telefono` })
    telefonoViviendaSeguimientoHogar?: string;
    // ------------------------------------------------------
    // OBSERVACIONES DEL ENCUESTADOR
    @Column({ nullable: true, comment: `Describa brevemente si durante la visita observó alguna característica de la vivienda que le haya llamado la atención y/o que considere anormal ` })
    observacionesEncuestador?: string;

     // ------------------------------------------------------
    // TRATAMIENTO DE DATOS PERSONALES
    @Column({ type: 'enum', enum: ['N', 'S'], comment: `85. ¿Autoriza el tratamiento de datos personales?` })
    autorizacionTratamientoDatos: string

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `86. ¿Autoriza el uso de imagen?` })
    autorizacionUsoImagen: string
}