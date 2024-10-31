// acceso-vivienda.dto.ts
import { IsOptional, IsEnum, IsNumber } from 'class-validator';

export class AccesoViviendaDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsEnum(['N', 'S'], { message: 'El valor debe ser "N" (No) o "S" (Sí).' })
    medioTransporte?: string;

    @IsOptional()
    @IsEnum(['N', 'S'], { message: 'El valor debe ser "N" (No) o "S" (Sí).' })
    centroSociales?: string;

    @IsOptional()
    @IsEnum(['N', 'S'], { message: 'El valor debe ser "N" (No) o "S" (Sí).' })
    parques?: string;

    // Relación con `Caracterizacion` por su ID si es necesario
    @IsOptional()
    @IsNumber()
    caracterizacionId?: number;
}
