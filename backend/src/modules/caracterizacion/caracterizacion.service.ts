import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caracterizacion } from './entities/caracterizacion.entity';
import { CaracterizacionDto } from './dto/create-caracterizacion.dto';
import { UpdateCaracterizacionDto } from './dto/update-caracterizacion.dto';
import { MiembrosFamilia } from './entities/miembros-familia.entity';

@Injectable()
export class CaracterizacionService {
  constructor(
    @InjectRepository(Caracterizacion)
    private caracterizacionRepository: Repository<Caracterizacion>,

    @InjectRepository(MiembrosFamilia)
    private miembrosFamiliaRepository: Repository<MiembrosFamilia>, // Inyectar el repositorio relacionado
  ) { }

  // Crear
  // async create(createCaracterizacionDto: CreateCaracterizacionDto): Promise<Caracterizacion> {
  async create(createCaracterizacionDto): Promise<Caracterizacion> { 
    try {
      return await this.caracterizacionRepository.save(createCaracterizacionDto);
    } catch (e) {
      // console.log('...............................');
      // console.log(e);
      // console.log('...............................');
      if ( e.code === 'ER_DUP_ENTRY' ) { 
        throw new BadRequestException(`La identificación ya existe en base de datos`);
      }
      
      throw new InternalServerErrorException(`Ocurrió un error al crear el beneficiario`);
    }
  }

  // consultar todos
  findAll(): Promise<Caracterizacion[]> {
    return this.caracterizacionRepository.find({ relations: ['miembrosFamilia'] });
  }

  // consultar uno por documento identidad
  findOne(identificacion: string): Promise<Caracterizacion> {
    return this.caracterizacionRepository.findOne({
      where: { identificacion }
      , relations: ['miembrosFamilia']
    });
  }

  // Actualizar
  async update(id: string, updateCaracterizacionDto: UpdateCaracterizacionDto): Promise<Caracterizacion> {
    const caracterizacion = await this.findOne(id);
    await this.caracterizacionRepository.save(caracterizacion);
    return this.findOne(id);
  }

  // Eliminar
  async remove(id: number): Promise<void> {
    await this.caracterizacionRepository.delete(id);
  }
}
