import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Caracterizacion } from "./caracterizacion.entity";

@Entity({ name: `lugaresVivienda` })
export class LugaresVivienda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, comment: `1. Terrenos baldíos` })
    terrenoBaldios?: string;

    @Column({ nullable: true, comment: `2. Plagas: roedores, cucarachas, zancudos, moscas, etc.` })
    plagas?: string;

    @Column({ nullable: true, comment: `3. Industrias. Contaminantes` })
    industria?: string;

    @Column({ nullable: true, comment: `4. Porquerizas` })
    porquerizas?: string;

    @Column({ nullable: true, comment: `5. Malos olores` })
    malosOlores?: string;

    @Column({ nullable: true, comment: `6. Rellenos sanitarios/botaderos` })
    rellenos?: string;

    @Column({ nullable: true, comment: `7. Contaminación auditiva` })
    contaminacionAuditiva?: string;

    @Column({ nullable: true, comment: `8. Contaminación visual` })
    contaminacionVisual?: string;

    @Column({ nullable: true, comment: `9. Río o quebrada` })
    rio?: string;

    @Column({ nullable: true, comment: `10. Otro` })
    especifique?: string;

    @Column({ nullable: true, comment: `10. Otro. Especifique` })
    especifiqueOtro?: string;

    @ManyToOne(() => Caracterizacion, (cara) => cara.lugaresVivienda)
    caracterizacion: Caracterizacion
}