import { IsOptional, IsString } from 'class-validator';

export class LugaresViviendaDto {
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    terrenoBaldios?: string;

    @IsOptional()
    @IsString()
    plagas?: string;

    @IsOptional()
    @IsString()
    industria?: string;

    @IsOptional()
    @IsString()
    porquerizas?: string;

    @IsOptional()
    @IsString()
    malosOlores?: string;

    @IsOptional()
    @IsString()
    rellenos?: string;

    @IsOptional()
    @IsString()
    contaminacionAuditiva?: string;

    @IsOptional()
    @IsString()
    contaminacionVisual?: string;

    @IsOptional()
    @IsString()
    rio?: string;

    @IsOptional()
    @IsString()
    especifique?: string;

    @IsOptional()
    @IsString()
    especifiqueOtro?: string;

    @IsOptional()
    caracterizacion?: number;
}
