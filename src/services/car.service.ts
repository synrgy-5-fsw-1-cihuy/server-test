import AppError from "@/utils/error";

import { ICar, ICarRequest } from "@dto/car.dto";

import CarRepository from "@repositories/car.repository";

import saveImage from "@utils/cloudinary";

const getAllCar = async () => {
  const cars = await CarRepository.getAllCar();
  return cars;
};

const getCarById = async (id: string) => {
  const car = await CarRepository.getCarById(id);

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  return car;
};

const createCar = async (data: ICarRequest, userId: number) => {
  const image: Express.Multer.File = data.image;
  const cloudinaryImage = (await saveImage(image.path)) as string;
  const result = await CarRepository.createCar({
    ...data,
    image: cloudinaryImage,
    createdBy: userId,
  });

  return result;
};

const updateCar = async (data: ICar, carId: string, userId: number) => {
  const car = await CarRepository.getCarById(carId);

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  const result = await CarRepository.updateCar({ ...data, updatedBy: userId }, carId);

  if (!result[0]) {
    throw new AppError("Something went wrong", 400);
  }

  return result;
};

const deleteCar = async (carId: string, userId: number) => {
  const car = await CarRepository.getCarById(carId);

  if (!car) {
    throw new AppError("Car not found", 404);
  }
  await CarRepository.updateCar({ ...car, deletedBy: userId }, carId);
  const result = await CarRepository.deleteCar(carId);

  if (!result) {
    throw new AppError("Something went wrong", 400);
  }

  return result;
};

export default {
  getAllCar,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
