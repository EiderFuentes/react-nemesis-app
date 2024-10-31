import { IsEnum, IsOptional } from 'class-validator';

export class ServiciosBasicosDto {
    @IsOptional()
    id?: number;

    @IsEnum(['N', 'S'], { message: 'El valor debe ser "N" (No) o "S" (Sí).' })
    energiaElectrica: string; // N-S

    @IsEnum(['N', 'S'], { message: 'El valor debe ser "N" (No) o "S" (Sí).' })
    gasTuberia: string; // N-S

    @IsEnum(['N', 'S'], { message: 'El valor debe ser "N" (No) o "S" (Sí).' })
    acueducto: string; // N-S

    @IsEnum(['N', 'S'], { message: 'El valor debe ser "N" (No) o "S" (Sí).' })
    alcantarillado: string; // N-S

    @IsEnum(['N', 'S'], { message: 'El valor debe ser "N" (No) o "S" (Sí).' })
    telefono: string; // N-S

    @IsEnum(['N', 'S'], { message: 'El valor debe ser "N" (No) o "S" (Sí).' })
    aseo: string; // N-S

    @IsOptional()
    caracterizacion?: number;
}
