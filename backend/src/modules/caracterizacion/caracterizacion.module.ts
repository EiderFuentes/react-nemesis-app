import { Module } from '@nestjs/common';
import { CaracterizacionService } from './caracterizacion.service';
import { CaracterizacionController } from './caracterizacion.controller';
import { Caracterizacion } from './entities/caracterizacion.entity';
import { MiembrosFamilia } from './entities/miembros-familia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Caracterizacion, MiembrosFamilia])],
  controllers: [CaracterizacionController],
  providers: [CaracterizacionService],
})
export class CaracterizacionModule { }
