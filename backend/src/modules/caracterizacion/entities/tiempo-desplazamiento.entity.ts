import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `tiempoDesplazamiento` })
export class TiempoDesplazamiento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, comment: `a. A pie` })
    apie?: string;

    @Column({ nullable: true, comment: `b. En bicicleta` })
    bicicleta?: string;

    @Column({ nullable: true, comment: `c. En vehículo motorizado` })
    vehiculoMotorizado?: string;

    @Column({ nullable: true, comment: `d. En Mula/caballo/burro` })
    caballo?: string;

    @Column({ nullable: true, comment: `e. Otro` })
    otro?: string;

    @Column({ nullable: true, comment: `e. Otro. Especifique` })
    especifiqueOtro?: string;

    @Column({ nullable: true, comment: `f. No aplica` })
    noAplica?: string;

    @ManyToOne(() => Caracterizacion, (cara) => cara.tiempoDesplazamiento)
    caracterizacion: Caracterizacion

}