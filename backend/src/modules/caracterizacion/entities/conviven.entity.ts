import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `conviven` })
export class Conviven {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `a. Fuma cigarrillo y/o tabaco? - Sí No` })
    fumaCigarrillo: string; //N-S

    @Column({ type: 'enum', enum: ['N', 'S'], comment: `b. Consume licor? - Sí No` })
    consumeLicor: string; //N-S

    @ManyToOne(() => Caracterizacion, (cara) => cara.conviven)
    caracterizacion: Caracterizacion

}