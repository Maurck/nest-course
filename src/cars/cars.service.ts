import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { Car } from './interfaces/car.interface';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Injectable()
export class CarsService {

  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Carolla'
    // }
  ]

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((e) => e.id == id);
    if (!car) throw new NotFoundException(`El carro con el id ${id} no existe`);

    return car;
  }

  createOne(createCarDTO: CreateCarDTO) {
    const id = uuid();
    let car: Car = { ...createCarDTO, id };
    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDTO: UpdateCarDTO) {
    let carDB: Car = this.findOneById(id);
    this.cars.map(car => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDTO, id };
        return carDB;
      }
      return car;
    })
    return carDB;
  }

  delete(id: string) {
    let car: Car = this.findOneById(id);
    this.cars = this.cars.filter(car => car.id !== id);
    return car;
  }

  fillCars(cars: Car[]) {
    this.cars = cars;
  }
}
