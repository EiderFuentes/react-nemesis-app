import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `tiempoCasa` })
export class TiempoCasa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, comment: `a. En la sala` })
    sala?: string;

    @Column({ nullable: true, comment: `b. En la cocina` })
    cocina?: string;

    @Column({ nullable: true, comment: `c. En la habitación` })
    habitacion?: string;

    @Column({ nullable: true, comment: `d. Otro` })
    especifique?: string;

    @Column({ nullable: true, comment: `d. Otro. Especifique` })
    especifiqueOtro?: string;

    @ManyToOne(() => Caracterizacion, (cara) => cara.tiempoCasa)
    caracterizacion: Caracterizacion
}