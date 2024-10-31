import { IsEnum, IsOptional } from 'class-validator';

export class AmbientesSeparadosDto {
    @IsOptional()
    id?: number;

    @IsEnum(['N', 'S', 'NA'], { message: `73. Seleccione una opción valida por favor` })
    cocina: string; // N-S-NA

    @IsEnum(['N', 'S', 'NA'], { message: `73. Seleccione una opción valida por favor` })
    dormitorioAdulto: string; // N-S-NA

    @IsEnum(['N', 'S', 'NA'], { message: `73. Seleccione una opción valida por favor` })
    sala: string; // N-S-NA

    @IsEnum(['N', 'S', 'NA'], { message: `73. Seleccione una opción valida por favor` })
    dormitorioNinos: string; // N-S-NA

    @IsEnum(['N', 'S', 'NA'], { message: `73. Seleccione una opción valida por favor` })
    sanitario: string; // N-S-NA

    @IsEnum(['N', 'S', 'NA'], { message: `73. Seleccione una opción valida por favor` })
    lavadero: string; // N-S-NA

    @IsOptional()
    caracterizacion?: number;
}
