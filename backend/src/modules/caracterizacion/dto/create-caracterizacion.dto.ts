// caracterizacion.dto.ts
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ConvivenDto } from './conviven.dto';
import { MiembrosFamiliaDto } from './miembros-familia.dto';
import { TiempoLibreDto } from './tiempo-libre.dto';
import { AccesoViviendaDto } from './acceso-vivienda.dto';
import { TiempoDesplazamientoDto } from './tiempo-desplazamiento.dto';
import { CombustibleCocinaDto } from './combustible.dto';
import { ServiciosBasicosDto } from './servicios-basicos.dto';
import { TopografiaTerrenoDto } from './topografia-terreno.dto';
import { LugaresViviendaDto } from './lugares-vivienda.dto';
import { AmbientesSeparadosDto } from './ambientes-separados.dto';
import { DuermenViviendaDto } from './duermen-vivienda.dto';
import { ElementosCasaDto } from './elementos-casa.dto';
import { DesplazamientoDto } from './desplazamiento.dto';
import { TiempoCasaDto } from './tiempo-casa.dto';
import { IsAnyFieldTrueInDisplacement } from '../../common/validators/at-least-one-field-validator';
export class CaracterizacionDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty({ message: `1. El campo no puede estar vacio` })
  @IsString()
  nombreEncuestador: string;

  @IsNotEmpty({ message: `2. El campo no puede estar vacio` })
  @IsString()
  fechaEncuesta: string;

  @IsOptional()
  @IsString()
  horaInicioEncuesta?: string;

  @IsOptional()
  @IsString()
  horaFinEncuesta?: string;

  @IsOptional()
  @IsString()
  nombreSupervisorEncuestador?: string;

  @IsNotEmpty({ message: `5. El campo no puede estar vacio` })
  @IsString()
  identificacion: string;

  @IsNotEmpty({ message: `6. El campo no puede estar vacio` })
  @IsString()
  nombreApellido: string;

  @IsEnum(['F', 'M'], { message: `7. Seleccione una opción valida por favor` })
  sexo: string;

  @IsNotEmpty({ message: `8. El campo no puede estar vacio` })
  @IsString()
  edad: string;

  @IsNotEmpty({ message: `9. El campo no puede estar vacio` })
  @IsString()
  direccion: string;

  @IsNotEmpty({ message: `10. El campo no puede estar vacio` })
  @IsString()
  barrio: string;

  @IsNotEmpty({ message: `10.1 El campo no puede estar vacio` })
  @IsString()
  municipio: string;

  @IsNotEmpty({ message: `11. El campo no puede estar vacio` })
  @IsString()
  telefono: string;

  @IsEnum(['N', 'S'], { message: `12. Seleccione una opción valida por favor` })
  organizacionComunitariaProyecto: string;

  //Duda preguntar ?
  @IsString()
  cualOrganizacionComunitariaProyecto: string;

  @Min(1, { message: `13. Ingrese un valor valido por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  totalPersonasVivienda: number;

  @Min(1, { message: `14. Ingrese un valor valido por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  totalFamiliasVivienda: number;

  @ValidateNested({ each: true })
  @Type(() => MiembrosFamiliaDto)
  @IsArray()
  @ArrayMinSize(1, { message: 'Debe haber al menos un miembro de familia.' })
  miembrosFamilia: MiembrosFamiliaDto[];

  @IsEnum(['N', 'S'], { message: '26. Seleccione una opción valida por favor' })
  haRecibidoAyuda: string;

  @IsOptional()
  @IsString()
  nombreAyudaOrganizacion?: string;

  @IsOptional()
  @IsString()
  tipoAyuda?: string;

  @IsNotEmpty({ message: `27. El campo no puede estar vacio` })
  @IsString()
  principalNecesidad: string;

  @IsEnum(['N', 'S'], { message: `28. Seleccione una opción valida por favor` })
  haSidoDesplazado: string;

  @IsOptional()
  @IsString()
  haceCuantoTiempoDesplazado?: string;

  @IsOptional()
  @IsString()
  lugarDeDesplazado?: string;

  @IsOptional()
  @IsEnum(['N', 'S'], { message: `29. Seleccione una opción valida por favor` })
  deseaVolverAlSitioDeDesplazado?: string;

  @IsOptional()
  @IsString()
  porqueSiNoDesea?: string;

  @IsOptional()
  @IsEnum(['N', 'S'], { message: `30. Seleccione una opción valida por favor` })
  haSidoRechazadoDespuesDeDesplazado?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DesplazamientoDto)
  @IsArray()
  desplazamiento?: DesplazamientoDto[];

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  afectadoConsecuenciaDesplazamiento?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  haSidoPositivoElDesplazamiento?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TiempoCasaDto)
  @IsArray()
  @IsAnyFieldTrueInDisplacement({ message: '34. Debe marcar al menos una opción' })
  tiempoCasa?: TiempoCasaDto[];

  @Min(1, { message: `35. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  comoConsumenLosAlimentos: number;

  @IsEnum(['N', 'S'], { message: `36. Seleccione una opción valida por favor` })
  maltratoViolenciaEnLaFamilia: string;

  @IsOptional()
  @IsEnum(['N', 'S'], { message: `37. Seleccione una opción valida por favor` })
  haPedidoAyudaDenunciado?: string;

  @IsOptional()
  @IsString()
  haPedidoAyudaDenunciadoPorQue?: string;

  @Min(1, { message: `38. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  decisionesImportantesEnFamilia: number;

  @IsOptional()
  @IsString()
  decisionesFamilia?: string;

  @IsEnum(['N', 'S'], { message: `39. Seleccione una opción valida por favor` })
  seSienteAgustoEnLaVivienda: string;

  @IsString()
  seSienteAgustoEnLaViviendaPorQue: string;

  @IsEnum(['N', 'S'], { message: `40. Seleccione una opción valida por favor` })
  necesitaCapacitarse: string;

  @IsString()
  necesitaCapacitarseEspecifique: string;

  @IsEnum(['N', 'S'], { message: `41. Seleccione una opción valida por favor` })
  emprenderNegocio: string;

  @IsString()
  emprenderNegocioEspecifique: string;

  @Min(1, { message: `42. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  condicionesDeVida: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConvivenDto)
  @IsArray()
  conviven?: ConvivenDto[];

  @IsEnum(['N', 'S'], { message: `44. Seleccione una opción valida por favor` })
  consumeMedicamentos: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TiempoLibreDto)
  @IsArray()
  @IsAnyFieldTrueInDisplacement({ message: '45. Debe marcar al menos una opción' })
  tiempoLibre?: TiempoLibreDto[];

  @Min(1, { message: `46. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  viviendaOcupada: number;

  @IsOptional()
  @IsString()
  viviendaOcupadaEspecifique?: string;

  @IsEnum(['N', 'S'], { message: `47. Seleccione una opción valida por favor` })
  loteViviendaLegal: string;

  @Min(1, { message: `48. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  estratoVivienda: number;

  @IsEnum(['N', 'S'], { message: `49. Seleccione una opción valida por favor` })
  realizaTrabajoNegocioEnVivienda: string;

  @IsOptional()
  @IsString()
  realizaTrabajoNegocioEnViviendaCual?: string;

  @Min(1, { message: `50. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  ingresosMensualesPromedio: number;

  @IsNotEmpty({ message: `51. El campo no puede estar vacio` })
  @IsString()
  gastosMensualesServicios: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AccesoViviendaDto)
  @IsArray()
  @IsAnyFieldTrueInDisplacement({ message: '52. Debe marcar al menos una opción' })
  accesoVivienda?: AccesoViviendaDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TiempoDesplazamientoDto)
  @IsArray()
  @IsAnyFieldTrueInDisplacement({ message: '53. Debe marcar al menos una opción' })
  tiempoDesplazamiento?: TiempoDesplazamientoDto[];

  @Min(1, { message: `54. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  sitioPreparaAlimientos: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CombustibleCocinaDto)
  @IsArray()
  @IsAnyFieldTrueInDisplacement({ message: '55. Debe marcar al menos una opción' })
  combustibleCocina?: CombustibleCocinaDto[];

  @Min(1, { message: `56. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  servicioSanitario: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ServiciosBasicosDto)
  @IsArray()
  @IsAnyFieldTrueInDisplacement({ message: '57. Debe marcar al menos una opción' })
  serviciosBasicos?: ServiciosBasicosDto[];

  @IsEnum(['N', 'S'], { message: `58. Seleccione una opción valida por favor` })
  conformeConServicios: string;

  @IsString()
  conformeConServiciosEspecifique: string;

  @Min(1, { message: `59. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  fuenteAguaVivienda: number;

  @IsOptional()
  @IsString()
  fuenteAguaViviendaEspecifique?: string;

  @Min(1, { message: `60. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  obtieneAguaFormaRegular: number;

  @IsEnum(['N', 'S'], { message: `61. Seleccione una opción valida por favor` })
  lavanFrutasVerduras: string;

  @IsEnum(['N', 'S'], { message: `62. Seleccione una opción valida por favor` })
  enciendenVelasVelones: string;

  @IsEnum(['N', 'S'], { message: `63. Seleccione una opción valida por favor` })
  humoDentroVivienda: string;

  @IsEnum(['N', 'S'], { message: `64. Seleccione una opción valida por favor` })
  accidentadoEnVivienda: string;

  @Min(1, { message: `65. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  tipoVivienda: number;

  @IsEnum(['N', 'S'], { message: `66. Seleccione una opción valida por favor` })
  viviendaAutoConstruida: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TopografiaTerrenoDto)
  @IsArray()
  @IsAnyFieldTrueInDisplacement({ message: '67. Debe marcar al menos una opción' })
  topografiaTerreno?: TopografiaTerrenoDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LugaresViviendaDto)
  @IsArray()
  @IsAnyFieldTrueInDisplacement({ message: '68. Debe marcar al menos una opción' })
  lugaresVivienda?: LugaresViviendaDto[];

  @IsEnum(['N', 'S'], { message: `69. Seleccione una opción valida por favor` })
  zonasRecreativas: string;

  @IsNotEmpty({ message: `70. Seleccione una opción valida por favor` })
  @IsString()
  materialPredominantePiso: string;

  @Min(1, { message: `71. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  materialPredominanteParedes: number;

  @IsOptional()
  @IsString()
  materialPredominanteParedesEspecifique?: string;

  @Min(1, { message: `72. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  materialPredominanteTecho: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AmbientesSeparadosDto)
  @IsArray()
  ambientesSeparados?: AmbientesSeparadosDto[];

  @Min(1, { message: `74. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  numeroCuartosHogar: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DuermenViviendaDto)
  @IsArray()
  @IsAnyFieldTrueInDisplacement({ message: '75. Debe marcar al menos una opción' })
  duermenVivienda?: DuermenViviendaDto[];

  @Min(1, { message: `76. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  numeroCamasVivienda: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ElementosCasaDto)
  @IsArray()
  elementosCasa?: ElementosCasaDto[];

  @Min(1, { message: `78. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  lugarDisponenExcretas: number;

  @Min(1, { message: `79. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  numeroSanitariosHogar: number;

  @IsNotEmpty({ message: `80. Seleccione una opción valida por favor` })
  @IsString()
  lugarSanitario: string;

  @IsEnum(['N', 'S', 'NA'], { message: `81. Seleccione una opción valida por favor` })
  lavamanosCercaSanitario: string;

  @Min(1, { message: `82. Seleccione una opción valida por favor` })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  recogenBasura: number;

  @IsOptional()
  @IsString()
  nombreCompletoSeguimientoHogar?: string;

  @IsNotEmpty({ message: `84. El campo no puede estar vacio` })
  @IsString()
  direccionViviendaSeguimientoHogar: string;

  @IsOptional()
  @IsString()
  telefonoViviendaSeguimientoHogar?: string;

  @IsOptional()
  @IsString()
  observacionesEncuestador?: string;

  @IsEnum(['N', 'S'], { message: `85. Seleccione una opción valida por favor` })
  autorizacionTratamientoDatos: string;

  @IsEnum(['N', 'S'], { message: `86. Seleccione una opción valida por favor` })
  autorizacionUsoImagen: string;
}
