import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from './caracterizacion.entity';

@Entity({ name: `desplazamiento` })
export class Desplazamiento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, comment: `a. Están más unidos` })
    estanUnidos?: string;

    @Column({ nullable: true, comment: `b. Se desintegró la familia` })
    desintegroFamilia?: string;

    @Column({ nullable: true, comment: `c. Hay problemas familiares` })
    problemasFamiliares?: string;

    @Column({ nullable: true, comment: `d. Ningún cambio` })
    ningunCambio?: string;

    @ManyToOne(() => Caracterizacion, (cara) => cara.desplazamiento)
    caracterizacion: Caracterizacion
}