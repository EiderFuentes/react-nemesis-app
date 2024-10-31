import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `accesoVivienda` })
export class AccesoVivienda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ['N', 'S'], nullable: true, comment: `a. Medios de transporte (Buses, autos, camiones, lanchas, etc.) - Sí No ` })
    medioTransporte?: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], nullable: true, comment: `b. Centros sociales, culturales y/o recreacionales - Sí No ` })
    centroSociales?: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], nullable: true, comment: `c. Parques, áreas deportivas y/o zonas verdes - Sí No ` })
    parques?: string; //N-S

    @ManyToOne(() => Caracterizacion, (cara) => cara.accesoVivienda)
    caracterizacion: Caracterizacion
}