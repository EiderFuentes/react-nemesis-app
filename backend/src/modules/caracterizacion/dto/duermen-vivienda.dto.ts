import { IsOptional, IsString } from 'class-validator';

export class DuermenViviendaDto {
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    cama?: string;

    @IsOptional()
    @IsString()
    estera?: string;

    @IsOptional()
    @IsString()
    camasinColchon?: string;

    @IsOptional()
    @IsString()
    hamaca?: string;

    @IsOptional()
    @IsString()
    colchon?: string;

    @IsOptional()
    @IsString()
    otro?: string;

    @IsOptional()
    @IsString()
    cualOtro?: string;

    @IsOptional()
    caracterizacion?: number;
}
