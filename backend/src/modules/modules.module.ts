import { Module, flatten } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CaracterizacionModule } from './caracterizacion/caracterizacion.module';
import { Caracterizacion } from './caracterizacion/entities/caracterizacion.entity';
import { MiembrosFamilia } from './caracterizacion/entities/miembros-familia.entity';
import { Desplazamiento } from './caracterizacion/entities/desplazamiento.entity';
import { TiempoCasa } from './caracterizacion/entities/tiempo-casa.entity';
import { TiempoLibre } from './caracterizacion/entities/tiempo-libre.entity';
import { AccesoVivienda } from './caracterizacion/entities/acceso-vivienda.entity';
import { Conviven } from './caracterizacion/entities/conviven.entity';
import { TiempoDesplazamiento } from './caracterizacion/entities/tiempo-desplazamiento.entity';
import { TopografiaTerreno } from './caracterizacion/entities/topografia-terreno.entity';
import { LugaresVivienda } from './caracterizacion/entities/lugares-vivienda.entity';
import { DuermenVivienda } from './caracterizacion/entities/duermen-vivienda.entity';
import { ServiciosBasicos } from './caracterizacion/entities/servicios-basicos.entity';
import { AmbientesSeparados } from './caracterizacion/entities/ambientes-separados.entity';
import { CombustibleCocina } from './caracterizacion/entities/combustible-cocina.entity';
import { ElementosCasa } from './caracterizacion/entities/elementos-casa.entity';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Caracterizacion
        , MiembrosFamilia
        , Desplazamiento
        , TiempoCasa
        , TiempoLibre
        , AccesoVivienda
        , Conviven
        , TiempoDesplazamiento
        , TopografiaTerreno
        , LugaresVivienda
        , DuermenVivienda
        , ServiciosBasicos
        , AmbientesSeparados
        , CombustibleCocina
        , ElementosCasa
      ],
      synchronize: false,
      autoLoadEntities: true, //--
    })
    , CaracterizacionModule, CommonModule
  ],
})
export class ModulesModule { }
