import { CarDataBase } from '../Database/CarDataBase';
import { CustomError } from '../Error/CustomError';
import { alterData, carData } from '../Models/Car';
import { IdGenerator } from '../Services/IdGenerator';

export class CarBusiness {
  constructor(private idGenerator: IdGenerator, private carDB: CarDataBase) {}

  public async getCars() {
    try {
      const result = await this.carDB.getCars();
      if (!result) {
        return new CustomError('Bad Request', 400);
      }
      return result;
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, error.code);
      }
    }
  }

  public async addCar(car: carData) {
    try {
      if (!car.name || !car.brand) {
        throw new CustomError('Missing name and/or brand', 422);
      }

      if (!car.maxPrice || !car.minPrice) {
        throw new CustomError('Missing max_price and/or min_price', 422);
      }

      if (!car.color || !car.year) {
        throw new CustomError('Missing color and/or year', 422);
      }
      if (!car.licensePlate || !car.description) {
        throw new CustomError('Missing license_plate and/or description', 422);
      }

      const plate = await this.carDB.getCarByLicensePlate(car.licensePlate);

      if (plate) {
        throw new CustomError('license_plate already exists', 409);
      }

      const id = this.idGenerator.generate();

      const newCar = { ...car, id };
      await this.carDB.addCar(newCar);
      return 'Carro adicionado';
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, error.code);
      }
    }
  }

  public async getCarsById(id: string) {
    try {
      const result = await this.carDB.getCarsById(id);
      if (!result) {
        return new CustomError('Bad Request', 400);
      }
      return result;
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, error.code);
      }
    }
  }

  public async alterCar(id: string, car: alterData) {
    try {
      const alter = {
        ...car,
        brand: car.brand,
        color: car.color,
        year: car.year,
        minPrice: car.minPrice,
        maxPrice: car.maxPrice,
      };
      const result = (await this.alterCar(id, alter)) as any;

      if (!result) {
        return new CustomError('Bad Request', 400);
      }

      return 'Carro Alterado';
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, error.code);
      }
    }
  }
}
