import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `duermenVivienda` })
export class DuermenVivienda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, comment: `a. Cama con colchón` })
    cama?: string;

    @Column({ nullable: true, comment: `b. Estera.` })
    estera?: string;

    @Column({ nullable: true, comment: `c cama sin colchón` })
    camasinColchon?: string;

    @Column({ nullable: true, comment: `d. Hamaca / Chinchorro` })
    hamaca?: string;

    @Column({ nullable: true, comment: `e. Colchón` })
    colchon?: string;

    @Column({ nullable: true, comment: `f. ¿Cuál?` })
    otro?: string;

    @Column({ nullable: true, comment: `f. Otro. ¿Cuál?` })
    cualOtro?: string;

    @ManyToOne(() => Caracterizacion, (cara) => cara.duermenVivienda)
    caracterizacion: Caracterizacion
}