import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";


@Entity({ name: `ambientesSeparados` })
export class AmbientesSeparados {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ['N', 'S', 'NA'], comment: `a. Cocina: 1. Si 2. No 3. NA` })
    cocina: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S', 'NA'], comment: `b. Dormitorio adultos: 1. Si 2. No 3. NA` })
    dormitorioAdulto: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S', 'NA'], comment: `c. Sala / Comedor: 1. Si 2. No 3. NA` })
    sala: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S', 'NA'], comment: `d. Dormitorio niños: 1. Si 2. No 3. NA` })
    dormitorioNinos: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S', 'NA'], comment: `e. Sanitario: 1. Si 2. No 3. NA` })
    sanitario: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S', 'NA'], comment: `f. Lavadero techado: 1. Si 2. No 3. NA` })
    lavadero: string; //N-S

    @ManyToOne(() => Caracterizacion, (cara) => cara.ambientesSeparados)
    caracterizacion: Caracterizacion

}