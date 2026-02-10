import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors"
import helmet from "helmet"

const app = express()

app.use(helmet())

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5137'
}))

app.use("/auth", authRoutes)
app.get('/', (req, res) => res.send("Test backend"))

export default app