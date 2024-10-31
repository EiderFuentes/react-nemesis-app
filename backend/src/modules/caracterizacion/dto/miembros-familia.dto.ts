// miembros-familia.dto.ts
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsEnum, IsNotEmpty, Min } from 'class-validator';

export class MiembrosFamiliaDto {
    @IsOptional()
    @IsNumber()
    id?: number;


    @IsNotEmpty({ message: `15. El campo no puede estar vacio` })
    @IsString()
    nombresApellidos: string;

    @IsEnum(['F', 'M'], { message: `16. Seleccione una opcion valida por favor` })
    sexo: string;

    @Min(1, { message: `17. Ingrese un valor valido por favor` })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    edad: number;

    @IsEnum(['A', 'M', 'D'], { message: `17.1 Seleccione una opcion valida por favor` })
    tipoEdad: string;

    @Min(1, { message: `18. Seleccione una opcion valida por favor` })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    estadoCivil: number;

    @Min(1, { message: `19. Seleccione una opcion valida por favor` })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    parentesco: number;

    @Min(1, { message: `20. Seleccione una opcion valida por favor` })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    ocupacion: number;

    @Min(1, { message: `21. Seleccione una opcion valida por favor` })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    aportaIngresos: number;

    @Min(1, { message: `22. Seleccione una opcion valida por favor` })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    nivelEscolaridad: number;

    @Min(1, { message: `23. Seleccione una opcion valida por favor` })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    tipoAfiliacionSalud: number;

    @Min(1, { message: `24. Seleccione una opcion valida por favor` })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    grupoAtencionEspecial: number;

    @Min(1, { message: `25. Seleccione una opcion valida por favor` })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    discapacidad: number;

    // La relación con `Caracterizacion` solo se referencia por su ID si es necesario
    @IsOptional()
    @IsNumber()
    caracterizacionId?: number;
}
