import express from 'express';
import { CarController } from '../Controller/CarController';

export const carRouter = express.Router();

const carController = new CarController();

carRouter.get('/cars', carController.getCars);
carRouter.get('/cars/:id', carController.getCarsById);

carRouter.post('/cars', carController.addCars);

carRouter.put('/cars/:id', carController.alterCar);
