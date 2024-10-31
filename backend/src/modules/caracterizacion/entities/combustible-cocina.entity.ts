import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `combustibleCocina` })
export class CombustibleCocina {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, comment: `a. Electricidad` })
    electricidad?: string;

    @Column({ nullable: true, comment: `b. Gas propano en cilindro` })
    gasPropano?: string;

    @Column({ nullable: true, comment: `c. Gas natural conectado a red pública` })
    gasNatural?: string;

    @Column({ nullable: true, comment: `d. Leña, madera o carbón de leña` })
    lena?: string;

    @Column({ nullable: true, comment: `e. Otro` })
    otro?: string;

    @Column({ nullable: true, comment: `e. Petróleo, gasolina, kerosén, alcohol` })
    petroleo?: string;

    @Column({ nullable: true, comment: `f. Carbón mineral` })
    carbonMineral?: string;

    @Column({ nullable: true, comment: `g. Materiales de desecho` })
    materiales?: string;

    @ManyToOne(() => Caracterizacion, (cara) => cara.combustibleCocina)
    caracterizacion: Caracterizacion

}