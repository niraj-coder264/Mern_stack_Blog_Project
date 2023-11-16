import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from "cors";
const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect('mongodb+srv://nirajpalmur:MGOM1uqLn1XYtxFV@cluster0.3vjwola.mongodb.net/Blog?retryWrites=true&w=majority').then(()=>app.listen(5000)).then(()=>console.log("connected to mongodb port 5000 sucessfully")).catch((err)=>console.log(err));


 