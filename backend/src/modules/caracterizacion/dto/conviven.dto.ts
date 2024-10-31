import { IsOptional, IsString, IsNumber, IsEnum, IsArray, ValidateNested } from 'class-validator';

export class ConvivenDto {

    @IsEnum(['N', 'S'], { message: `43. Seleccione una opción valida por favor` })
    fumaCigarrillo: string;


    @IsEnum(['N', 'S'], { message: `43. Seleccione una opción valida por favor` })
    consumeLicor: string;
}