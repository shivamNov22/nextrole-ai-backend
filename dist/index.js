import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
// import Razorpay from "razorpay";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
// import aiRoutes from "./routes/ai.js";
// import paymentRoutes from "./routes/payment.js";
dotenv.config();
/* -------------------------------------------------------------------------- */
/*                            KEEP SERVER AWAKE                               */
/* -------------------------------------------------------------------------- */
const url = "http://localhost:5000";
const interval = 30000;
const reloadWebsite = async () => {
    try {
        await axios.get(url);
        console.log("Website reloaded");
    }
    catch (error) {
        console.log(`Reload Error: ${error.message}`);
    }
};
setInterval(reloadWebsite, interval);
/* -------------------------------------------------------------------------- */
/*                           RAZORPAY INSTANCE                                */
/* -------------------------------------------------------------------------- */
// export const instance = new Razorpay({
//   key_id: process.env.Razorpay_Key!,
//   key_secret: process.env.Razorpay_Secret!,
// });
/* -------------------------------------------------------------------------- */
/*                             EXPRESS APP                                    */
/* -------------------------------------------------------------------------- */
const app = express();
/* -------------------------------- MIDDLEWARES ----------------------------- */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "10mb",
}));
/* ---------------------------------- ROUTES -------------------------------- */
app.use("/api/user", userRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/payment", paymentRoutes);
/* -------------------------------------------------------------------------- */
/*                            SERVER STARTUP                                  */
/* -------------------------------------------------------------------------- */
const startServer = async () => {
    try {
        /* ---------------------------- DATABASE CONNECTION ---------------------------- */
        await connectDB();
        console.log("DB connected");
        /* ------------------------------ START SERVER ------------------------------ */
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log("Server startup failed");
        console.log(error.message);
        process.exit(1);
    }
};
startServer();
