import { IsEnum, IsOptional } from 'class-validator';

export class ElementosCasaDto {
    @IsOptional()
    id?: number;

    @IsEnum(['N', 'S', 'NA'], { message: `77. Seleccione una opción valida por favor` })
    lavamanos: string; // N-S-NA

    @IsEnum(['N', 'S', 'NA'], { message: `77. Seleccione una opción valida por favor` })
    lavaplatos: string; // N-S-NA

    @IsEnum(['N', 'S', 'NA'], { message: `77. Seleccione una opción valida por favor` })
    lavaRopa: string; // N-S-NA

    @IsOptional()
    caracterizacion?: number;
}
