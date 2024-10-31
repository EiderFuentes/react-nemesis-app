import { IsOptional, IsString } from 'class-validator';

export class DesplazamientoDto {
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    estanUnidos?: string;

    @IsOptional()
    @IsString()
    desintegroFamilia?: string;

    @IsOptional()
    @IsString()
    problemasFamiliares?: string;

    @IsOptional()
    @IsString()
    ningunCambio?: string;

    @IsOptional()
    caracterizacion?: number;
}
