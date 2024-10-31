import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaracterizacionService } from './caracterizacion.service';
import { CaracterizacionDto } from './dto/create-caracterizacion.dto';
import { UpdateCaracterizacionDto } from './dto/update-caracterizacion.dto';

@Controller('caracterizacion')
export class CaracterizacionController {
  constructor(private readonly caracterizacionService: CaracterizacionService) { }

  @Post()
  create(@Body() createCaracterizacionDto: CaracterizacionDto) {
    // console.log(createCaracterizacionDto);
    // create(@Body() createCaracterizacionDto) {
    return this.caracterizacionService.create(createCaracterizacionDto);
  }

  @Get()
  findAll() {
    return this.caracterizacionService.findAll();
  }

  @Get(':identificacion')
  findOne(@Param('identificacion') identificacion: string) {
    return this.caracterizacionService.findOne(identificacion);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaracterizacionDto: UpdateCaracterizacionDto) {
    return this.caracterizacionService.update(id, updateCaracterizacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caracterizacionService.remove(+id);
  }
}
