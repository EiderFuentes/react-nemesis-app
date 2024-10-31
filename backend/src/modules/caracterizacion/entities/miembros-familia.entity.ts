import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Caracterizacion } from './caracterizacion.entity';

@Entity({ name: `miembrosFamilia` })
export class MiembrosFamilia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ comment: `15. Nombres y Apellidos` })
    nombresApellidos: string;

    @Column({ type: 'enum', enum: ['F', 'M'], comment: `16. Sexo M-F` })
    sexo: string; //M-F

    @Column({ comment: `17. Edad` })
    edad: number;

    @Column({ type: 'enum', enum: ['A', 'M', 'D'], comment: `17. Edad Años, Meses, Dias` })
    tipoEdad: string;

    @Column({ comment: `18. Estado civil 1. Soltero(a) 2. Casado(a) 3. Separado(a) 4. Viudo(a) 5. Unión libre 6. Otro` })
    estadoCivil: number;

    @Column({ comment: `19. Parentesco (respecto a quien responde la encuesta) 1. Jefe(a) de familia 2. Cónyuge o compañero(a) 3. Hijo(a) 4. Hermano(a) 5. Padre o madre 6. Otros` })
    parentesco: number;

    @Column({ comment: `20. Ocupación 1. Empleado 2. Trabajador independiente 3. Ama de casa 4. Jubilado, pensionado 5. Desempleado 6. Estudiante 7. No aplica por edad` })
    ocupacion: number;

    @Column({ comment: `21. Aporta ingresos económicos ala familia? 1. Si 2. No 3. No aplica ` })
    aportaIngresos: number;

    @Column({ comment: `22. Nivel de Escolaridad 1. Ninguno 2. Primaria completa 3. Primaria incompleta 4. Secundaria completa 5. Secundaria incompleta 6. Técnica o tecnológica 7. Universitaria 8. Postgrado 9 Otro` })
    nivelEscolaridad: number;

    @Column({ comment: `23. Tipo de afiliación en salud 1. Contributivo 2. Subsidiado 3. Sisbén 4. Ninguno` })
    tipoAfiliacionSalud: number;

    @Column({ comment: `24. Grupo de atención especial 1. Desplazados 2. Afrodescendiente 3. Indígenas 4. No aplica` })
    grupoAtencionEspecial: number;

    @Column({ comment: `25. Discapacidad 1. Motora 2. Auditiva 3. Visual 4. Del habla 5. Mental 6. Otra 7. Ninguna` })
    discapacidad: number;

    @ManyToOne(() => Caracterizacion, (cara) => cara.miembrosFamilia)
    caracterizacion: Caracterizacion;

}