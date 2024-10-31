import { IsOptional, IsString } from 'class-validator';

export class TiempoCasaDto {
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    sala?: string;

    @IsOptional()
    @IsString()
    cocina?: string;

    @IsOptional()
    @IsString()
    habitacion?: string;

    @IsOptional()
    @IsString()
    especifique?: string;

    @IsOptional()
    @IsString()
    especifiqueOtro?: string;

    @IsOptional()
    caracterizacion?: number;
}
