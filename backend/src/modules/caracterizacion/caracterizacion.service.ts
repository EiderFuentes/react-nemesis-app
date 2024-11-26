import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caracterizacion } from './entities/caracterizacion.entity';
import { CaracterizacionDto } from './dto/create-caracterizacion.dto';
import { UpdateCaracterizacionDto } from './dto/update-caracterizacion.dto';
import { MiembrosFamilia } from './entities/miembros-familia.entity';
import { PassThrough } from 'stream';


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
  async findOne(identificacion: string) {
    const response = await this.caracterizacionRepository.findOne({
      where: { identificacion }
      , relations: [ 'miembrosFamilia','desplazamiento','tiempoCasa','conviven','tiempoLibre','accesoVivienda','tiempoDesplazamiento','combustibleCocina',
                     'serviciosBasicos','topografiaTerreno','lugaresVivienda','ambientesSeparados','duermenVivienda','elementosCasa' ]
    });
 
    if ( !response ) {
      throw new NotFoundException(`No se encontró un beneficiario con identificación ${ identificacion }`);
    }

    let params = JSON.parse(JSON.stringify(response));
     
    //---------- Inicio pregunta 15 -------------
    // params.miembrosFamilia = params.miembrosFamilia[0];
    //delete params.miembrosFamilia.id;
    //---------- Fin pregunta 15 ----------------

    //---------- Inicio pregunta 31 -------------
    params.desplazamiento = params.desplazamiento[0];
    delete params.desplazamiento.id;
    //---------- Fin pregunta 31 ----------------

    //---------- Inicio pregunta 34 -------------
    params.tiempoCasa = params.tiempoCasa[0];
    let { especifique: otro_34, especifiqueOtro: especifiqueOtro_34  } = params.tiempoCasa;
    delete params.tiempoCasa.id;
    delete params.tiempoCasa.especifique;
    delete params.tiempoCasa.especifiqueOtro;
    params.tiempoCasa = {...params.tiempoCasa, otro_34 };
    params = {...params, especifiqueOtro_34 };
    //---------- Fin pregunta 34 -------------

    //---------- Inicio pregunta 43 -------------
    params.conviven = params.conviven[0];
    let { fumaCigarrillo, consumeLicor } = params.conviven;
    delete params.conviven;
    params = {...params, fumaCigarrillo, consumeLicor }
    //---------- Fin pregunta 43 ----------------

    //---------- Inicio pregunta 45 -------------
    params.tiempoLibre = params.tiempoLibre[0];
    let { otro: otro_45, especifiqueOtro: especifiqueOtro_45 } = params.tiempoLibre;
    delete params.tiempoLibre.id;
    delete params.tiempoLibre.otro;
    delete params.tiempoLibre.especifiqueOtro;
    params.tiempoLibre = {...params.tiempoLibre, otro_45 };
    params = {...params, especifiqueOtro_45 }
    //---------- Fin pregunta 45 -------------

    //---------- Inicio pregunta 52 -------------
    params.accesoVivienda = params.accesoVivienda[0];
    delete params.accesoVivienda.id;
    //---------- Fin pregunta 52 -------------

    //---------- Inicio pregunta 53 -------------
    params.tiempoDesplazamiento = params.tiempoDesplazamiento[0];
    let { otro: otro_53, especifiqueOtro: especifiqueOtro_53 } = params.tiempoDesplazamiento;
    delete params.tiempoDesplazamiento.id;
    delete params.tiempoDesplazamiento.otro;
    delete params.tiempoDesplazamiento.especifiqueOtro;
    params.tiempoDesplazamiento = {...params.tiempoDesplazamiento, otro_53 };
    params = {...params, especifiqueOtro_53 };
    //---------- Fin pregunta 53 -------------

    //---------- Inicio pregunta 55 -------------
    params.combustibleCocina = params.combustibleCocina[0];
    delete params.combustibleCocina.id;
    delete params.combustibleCocina.otro;
    //---------- Fin pregunta 55 -------------

    //---------- Inicio pregunta 57 -------------
    params.serviciosBasicos = params.serviciosBasicos[0];
    let { telefono: telefono_57 } = params.serviciosBasicos;
    delete params.serviciosBasicos.id;
    delete params.serviciosBasicos.telefono;
    params.serviciosBasicos = {...params.serviciosBasicos, telefono_57 };
    //---------- Fin pregunta 57 -------------

    //---------- Inicio pregunta 67 -------------
    params.topografiaTerreno = params.topografiaTerreno[0];
    delete params.topografiaTerreno.id;
    //---------- Fin pregunta 67 -------------

    //---------- Inicio pregunta 68 -------------
    params.lugaresVivienda = params.lugaresVivienda[0];
    let { especifiqueOtro: especifiqueOtro_68 } = params.lugaresVivienda;
    delete params.lugaresVivienda.id;
    delete params.lugaresVivienda.especifiqueOtro;
    params = {...params, especifiqueOtro_68 };
    //---------- Fin pregunta 68 -------------

    //---------- Inicio pregunta 73 -------------
    params.ambientesSeparados = params.ambientesSeparados[0];
    let { cocina: cocina_73, dormitorioAdulto: dormitorioAdulto_73, sala: sala_73, 
       dormitorioNinos: dormitorioNinos_73, sanitario: sanitario_73, lavadero: lavadero_73 } = params.ambientesSeparados;
    delete params.ambientesSeparados;
    params = {...params, cocina_73, dormitorioAdulto_73, sala_73, dormitorioNinos_73, sanitario_73, lavadero_73 };
    //---------- Fin pregunta 73 -------------

    //---------- Inicio pregunta 75 -------------
    params.duermenVivienda = params.duermenVivienda[0];
    let { otro: otro_75, cualOtro: cualOtro_75 } = params.duermenVivienda;
    delete params.duermenVivienda.id;
    delete params.duermenVivienda.otro;
    delete params.duermenVivienda.cualOtro;
    params.duermenVivienda = {...params.duermenVivienda, otro_75 };
    params = {...params, cualOtro_75 }
    //---------- Fin pregunta 75 -------------

    //---------- Inicio pregunta 77 -------------
    params.elementosCasa = params.elementosCasa[0];
    let { lavamanos: lavamanos_77, lavaplatos: lavaplatos_77, lavaRopa: lavaRopa_77 } = params.elementosCasa;
    delete params.elementosCasa;
    params = {...params, lavamanos_77, lavaplatos_77, lavaRopa_77 }
    //---------- Fin pregunta 77 -------------

    return params;
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
