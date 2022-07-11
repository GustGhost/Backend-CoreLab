export type carData = {
  name: string;
  brand: string;
  color: string;
  year: number;
  minPrice: number;
  maxPrice: number;
  licensePlate: string;
  description: string;
};

export type car = carData & { id: string };

export type alterData = {
  brand: string;
  color: string;
  year: number;
  minPrice: number;
  maxPrice: number;
};
