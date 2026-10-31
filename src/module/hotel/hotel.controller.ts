import type { Request, Response } from "express";
import { HotelService } from "./hotel.service";

export class HotelController {
    static async createHotel(req: Request, res: Response) {
        try {
            const { name, description, country, city, address, price } = req.body;
            if (!name || !description || !country || !city || !address || !price) {
                return res.status(400).json({ success: false, message: "Missing required fields" })
            } else {
                const hotel = await HotelService.createHotel({
                    name,
                    description,
                    address,
                    city,
                    country,
                    price
                })
                res.status(201).json({ success: true, messgae: "Hotel created successfully!" })
            }
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }

    static async getAllHotels(res: Response, req: Request) {
        try {
            const city = req.query.city as string | undefined
            const hotels = await HotelService.getAllHotels(city);
            return res.status(200).json({ success: true, message: hotels })
        } catch (error: any) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    static async getHotelById(res: Response, req: Request) {
        try {
            const id = Number(req.params.id);
            const hotel = await HotelService.getHotelById(id);
            return res.status(201).json({ success: true, message: hotel })
        } catch (error: any) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    static async createRoomType(res: Response, req: Request) {
        try {
            const hotelId = Number(req.params.id);
            const { name, description, capacity, price } = req.body;

            if (isNaN(hotelId) || !name || !capacity || !price) {
                return res.status(400).json({ success: true, message: "Missing required fields" })
            } else {
                const roomType = await HotelService.createRoomType({
                    name,
                    description: description || '',
                    capacity: Number(capacity),
                    price: price.toString(),
                    hotelId
                })
                res.status(201).json({ success: true, message: "Room type created successfully!", data: roomType })
            }
        } catch (error: any) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
}