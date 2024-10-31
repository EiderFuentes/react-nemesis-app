import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `serviciosBasicos` })
export class ServiciosBasicos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `a. Energía eléctrica - 1. Si 2. No` })
    energiaElectrica: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `b. Gas por tubería - 1. Si 2. No` })
    gasTuberia: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `c. Acueducto - 1. Si 2. No` })
    acueducto: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `d. Alcantarillado - 1. Si 2. No` })
    alcantarillado: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `e. Teléfono - 1. Si 2. No` })
    telefono: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `f. Aseo - 1. Si 2. No` })
    aseo: string; //N-S

    @ManyToOne(() => Caracterizacion, (cara) => cara.serviciosBasicos)
    caracterizacion: Caracterizacion

}