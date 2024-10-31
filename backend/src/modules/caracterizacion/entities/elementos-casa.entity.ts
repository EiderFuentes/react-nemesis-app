import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `elementosCasa` })
export class ElementosCasa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ['N', 'S', 'NA'], comment: `a. Lavamanos 1. Si 2. No 3. NA` })
    lavamanos: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S', 'NA'], comment: `b. Lavaplatos 1. Si 2. No 3. NA` })
    lavaplatos: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S', 'NA'], comment: `c. Lavadero de ropa 1. Si 2. No 3. NA` })
    lavaRopa: string; //N-S

    @ManyToOne(() => Caracterizacion, (cara) => cara.elementosCasa)
    caracterizacion: Caracterizacion

}