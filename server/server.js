import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnection.js";

// import routes
import authRoutes from "./routes/authRoute.js";
import taskRoutes from "./routes/taskRoute.js";
import trackRoutes from "./routes/trackRoute.js";
import submissionRoutes from "./routes/submissionRoute.js";

// load env variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// db connection
await connectDB();

// create express app
const app = express();

const allowedOrigins = [
  "https://intertechub-task-management-app.netlify.app",
  "http://localhost:5173",
];

const options = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// cors
app.use(cors(options));

// for parsing json bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/tracks", trackRoutes);
app.use("/submissions", submissionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
