import { PartialType } from '@nestjs/mapped-types';
import { CaracterizacionDto } from './create-caracterizacion.dto';

export class UpdateCaracterizacionDto extends PartialType(CaracterizacionDto) { }
