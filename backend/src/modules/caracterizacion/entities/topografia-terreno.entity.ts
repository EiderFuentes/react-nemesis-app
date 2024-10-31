import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `topografiaTerreno` })
export class TopografiaTerreno {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, comment: `a. Plano` })
    plano?: string;

    @Column({ nullable: true, comment: `b. Ladera` })
    ladera?: string;

    @Column({ nullable: true, comment: `c. Relleno` })
    relleno?: string;

    @Column({ nullable: true, comment: `d, Irregular` })
    irregular?: string;

    @Column({ nullable: true, comment: `e. Inundable` })
    inundable?: string;

    @Column({ nullable: true, comment: `f. Deslizamiento` })
    deslizamiento?: string;

    @ManyToOne(() => Caracterizacion, (cara) => cara.topografiaTerreno)
    caracterizacion: Caracterizacion
}