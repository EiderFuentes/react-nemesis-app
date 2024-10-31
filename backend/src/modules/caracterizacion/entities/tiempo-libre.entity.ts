import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `tiempolibre` })
export class TiempoLibre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, comment: `a. Hacer reuniones familiares` })
    reunionesFamiliares?: string;

    @Column({ nullable: true, comment: `b. Paseos` })
    paseos?: string;

    @Column({ nullable: true, comment: `c. Practicar algún tipo de deporte` })
    practicarDeporte?: string;

    @Column({ nullable: true, comment: `d. Otro` })
    otro?: string;

    @Column({ nullable: true, comment: `d. Otro. Especifique` })
    especifiqueOtro?: string;

    @ManyToOne(() => Caracterizacion, (cara) => cara.tiempoLibre)
    caracterizacion: Caracterizacion
}
