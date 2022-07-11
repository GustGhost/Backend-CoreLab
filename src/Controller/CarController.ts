import { Request, Response } from 'express';
import { CarBusiness } from '../Business/CarBusiness';
import { CarDataBase } from '../Database/CarDataBase';
import { alterData, carData } from '../Models/Car';
import { IdGenerator } from '../Services/IdGenerator';

const businessDB = new CarBusiness(new IdGenerator(), new CarDataBase());

export class CarController {
  public async getCars(req: Request, res: Response) {
    try {
      const result = await businessDB.getCars();
      res.status(200).send({ result });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  public async addCars(req: Request, res: Response) {
    try {
      const input: carData = {
        name: req.body.name,
        brand: req.body.brand,
        color: req.body.color,
        year: req.body.year,
        minPrice: req.body.min_price,
        maxPrice: req.body.max_price,
        licensePlate: req.body.license_plate.toUpperCase(),
        description: req.body.description,
      };

      const result = await businessDB.addCar(input);
      res.status(200).send({ result });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  public async getCarsById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await businessDB.getCarsById(id);
      res.status(200).send({ result });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  public async alterCar(req: Request, res: Response) {
    try {
      const input: alterData = {
        brand: req.body.brand,
        color: req.body.color,
        year: req.body.year,
        minPrice: req.body.min_price,
        maxPrice: req.body.max_price,
      };
      const { id } = req.params;

      const result = await businessDB.alterCar(id, input);
      res.status(200).send({ result });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
