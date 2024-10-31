import { IsOptional, IsString } from 'class-validator';

export class TiempoDesplazamientoDto {
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    apie?: string;

    @IsOptional()
    @IsString()
    bicicleta?: string;

    @IsOptional()
    @IsString()
    vehiculoMotorizado?: string;

    @IsOptional()
    @IsString()
    caballo?: string;

    @IsOptional()
    @IsString()
    otro?: string;

    @IsOptional()
    @IsString()
    especifiqueOtro?: string;

    @IsOptional()
    @IsString()
    noAplica?: string;

    @IsOptional()
    caracterizacion?: number;
}
