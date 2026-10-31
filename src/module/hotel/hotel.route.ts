import { Router } from "express";
import { HotelController } from "./hotel.controller";
import authMiddleware from "../../middleware/auth.middleware";

const hotelRouter: Router = Router()

hotelRouter.get('/', HotelController.getAllHotels);
hotelRouter.get('/:id', HotelController.getHotelById)

// auth protected routes

hotelRouter.post('/', authMiddleware, HotelController.createHotel);
hotelRouter.post('/:hotelId/room-types', authMiddleware, HotelController.createRoomType);
hotelRouter.post('/:hotelId/rooms', authMiddleware, HotelController.createRoom)

export default hotelRouter;