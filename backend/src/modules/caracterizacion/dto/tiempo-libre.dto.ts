// tiempo-libre.dto.ts
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class TiempoLibreDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    reunionesFamiliares?: string;

    @IsOptional()
    @IsString()
    paseos?: string;

    @IsOptional()
    @IsString()
    practicarDeporte?: string;

    @IsOptional()
    @IsString()
    otro?: string;

    @IsOptional()
    @IsString()
    especifiqueOtro?: string;

    // Relación con `Caracterizacion` por su ID si es necesario
    @IsOptional()
    @IsNumber()
    caracterizacionId?: number;
}
