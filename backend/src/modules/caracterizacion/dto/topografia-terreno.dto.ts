import { IsOptional, IsString } from 'class-validator';
import { Desplazamiento } from '../entities/desplazamiento.entity';

export class TopografiaTerrenoDto {
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    plano?: string;

    @IsOptional()
    @IsString()
    ladera?: string;

    @IsOptional()
    @IsString()
    relleno?: string;

    @IsOptional()
    @IsString()
    irregular?: string;

    @IsOptional()
    @IsString()
    inundable?: string;

    @IsOptional()
    @IsString()
    deslizamiento?: string;

    @IsOptional()
    caracterizacion?: number;
}
