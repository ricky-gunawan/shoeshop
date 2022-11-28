import "dotenv/config";
import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import credentials from "./middleware/credentials";
import verifyJWT from "./middleware/verifyJWT";
import verifyRoles from "./middleware/verifyRoles";
import roleList from "./config/roleList";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import adminProductRoutes from "./routes/adminProductRoutes";
import adminUserRoutes from "./routes/adminUserRoutes";
import adminCartRoutes from "./routes/adminCartRoutes";
import adminOrderRoutes from "./routes/adminOrderRoutes";
import getProductsDisplay from "./controller/getProductsDisplay";
import getSingleProductDisplay from "./controller/getSingleProductDisplay";
import getMe from "./controller/getMe";
import path from "path";

const app = express();

connectDB();

app.use(credentials);

// Cors Origin Resource Sharing
// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

app.use(cookieParser());

// Static Routes { changing image hoting to cloudinary }
// app.use("/api/static", express.static(path.join(__dirname, "assets")));

// User Auth Routes
app.use("/api/auth", authRoutes);

// Public
app.get("/api/products-display", getProductsDisplay);
app.get("/api/products-display/:productId", getSingleProductDisplay);

app.use(verifyJWT);

app.get("/api/get-me", getMe);

app.use("/cust-api", verifyRoles(roleList.customer));
// Product Routes
app.use("/cust-api/products", productRoutes);
// User Routes
app.use("/cust-api/users", userRoutes);
// Cart Routes
app.use("/cust-api/carts", cartRoutes);
// Order Routes
app.use("/cust-api/orders", orderRoutes);

app.use("/adm-api", verifyRoles(roleList.admin));
// Admin Product Routes
app.use("/adm-api/products", adminProductRoutes);
// Admin User Routes
app.use("/adm-api/users", adminUserRoutes);
// Admin Cart Routes
app.use("/adm-api/carts", adminCartRoutes);
// Admin Order Routes
app.use("/adm-api/orders", adminOrderRoutes);

// Admin Upload Route { changing image hoting to cloudinary }
// app.use("/adm-api/upload", adminUploadRoutes);

////// static file
// assets/image
// app.use(express.static(path.join(path.resolve(), "assets")));

// frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "frontend", "dist", "index.html"));
  });
}

// NotFound Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`));
