import { db } from '../../prisma/db';

export class HotelService {
    static async createHotel(data: { name: string, description: string, address: string, city: string, price: string, country: string }) {
        return await db.orm.public.Hotel.create({
            name: data.name,
            description: data.description,
            city: data.city,
            address: data.address,
            country: data.country,
        })
    }

    static async getAllHotels(city?: string) {
        if (city) {
            return db.orm.public.Hotel.where({ city }).all();
        }
        return db.orm.public.Hotel.all();
    }

    static async getHotelById(id: number) {
        const hotel = await db.orm.public.Hotel.where({ id }).first();
        if (!hotel) {
            throw new Error("Hotel not found, try to search for another one")
        }
        return hotel;
    }

    static async createRoomType(data: { name: string, description: string, capacity: number, price: string, hotelId: number }) {
        const hotel = await db.orm.public.Hotel.where({ id: data.hotelId }).first();
        if (!hotel) {
            throw new Error("Hotel not found, in create RoomType")
        }
        return await db.orm.public.RoomType.create({
            name: data.name,
            description: data.description,
            capacity: data.capacity,
            price: data.price,
            hotelId: data.hotelId,
        })

    }
    static async createRoom(data: { roomNumber: string, hotelId: number, roomTypeId: number }) {
        const room = await db.orm.public.Room.where({ roomNumber: data.roomNumber, hotelId: data.hotelId }).first();
        if (room) {
            throw new Error("This room number already exist")
        }
        return db.orm.public.Room.create({
            roomNumber: data.roomNumber,
            roomTypeId: data.roomTypeId,
            hotelId: data.hotelId
        })
    }
}