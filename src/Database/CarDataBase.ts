import { alterData, car } from '../Models/Car';
import { BaseDataBase } from './BaseDataBase';

export class CarDataBase extends BaseDataBase {
  private static Table_Name = 'Cars';

  getCars = async () => {
    const result = await BaseDataBase.connection(CarDataBase.Table_Name).select(
      '*'
    );
    return result;
  };

  getCarsById = async (id: string) => {
    const result = await BaseDataBase.connection(CarDataBase.Table_Name)
      .select('*')
      .where({ id });
    return result[0];
  };

  getCarByLicensePlate = async (licensePlate: string) => {
    const result = await BaseDataBase.connection(CarDataBase.Table_Name)
      .select('*')
      .where({ license_plate: licensePlate });

    return result[0];
  };

  addCar = async (car: car) => {
    await BaseDataBase.connection(CarDataBase.Table_Name).insert({
      id: car.id,
      name: car.name,
      brand: car.brand,
      color: car.color,
      year: car.year,
      min_price: car.minPrice,
      max_price: car.maxPrice,
      license_plate: car.licensePlate,
      description: car.description,
    });
  };

  alterCarData = async (id: string, alterData: alterData) => {
    await BaseDataBase.connection.raw(
      `UPDATE Cars SET Cars.brand = "${alterData.brand}",
        Cars.color = "${alterData.color}",
        Cars.year = ${alterData.year},
        Cars.min_price = ${alterData.minPrice},
        Cars.max_price = ${alterData.maxPrice}
        WHERE id = "${id}"`
    );
  };
}
