import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import promptResponseRouter from "./routes/promptResponse.routes.js";
import sendEmailsRouter from "./routes/sendEmails.routes.js";
import {authMiddleware} from "./middlewares/auth.middlewares.js";
import { rateLimitMiddlewareFactory } from "./middlewares/rateLimit.middlewares.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
}));

app.use(express.json());

app.get("/api/v1/test", (req, res) => {
    res.status(200).json("Construction Agent Server active.")
})

app.use("/api/v1/auth", authRouter);

app.use(
    "/api/v1/search-vendors", 
    authMiddleware,
    rateLimitMiddlewareFactory({
        window: 60_000,
        maxRequests: 3
    }),
    promptResponseRouter
);
app.use("/api/v1/send-emails", authMiddleware, sendEmailsRouter);

export default app;
