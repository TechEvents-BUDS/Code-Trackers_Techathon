import express from "express"; 
import ConnectDb from "./dbConnection.js";
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url'; 
const app = express();

app.use(cors({origin:"http://localhost:5173",credentials:true}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
const __path = path.dirname(__dirname); 
// const rootPath = path.join(__dirname, '../'); // Adjust path as per your structure

app.use('/images', express.static(path.join(__path, 'images')));// Get directory name
//database connection
ConnectDb();


app.use(express.json());
app.use(cookieParser());

app.use('/user',userRouter)


console.log("Images directory path:", path.join(__filename));



app.listen(8000,()=>{
    console.log(`Server is Running...`)
})