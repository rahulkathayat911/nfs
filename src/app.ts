import express, { type Express } from "express";
import authRouter from "./module/auth/auth.routes";
import hotelRouter from "./module/hotel/hotel.route";

const app: Express = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Hotel booking is running..."
  })
});

app.use('/api/auth', authRouter)
app.use('/api/hotels', hotelRouter)

export default app;
