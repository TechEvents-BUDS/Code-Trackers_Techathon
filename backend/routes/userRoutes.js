import express from 'express';
import { handleUserSignUp, handleUserLogIn, logout, verifyEmail, checkAuth } from '../controllers/userController.js';
import path from 'path';
import { fileURLToPath } from 'url';  // Import fileURLToPath
import { addProduct, showProducts, searchProducts, default as upload } from "../controllers/mpController.js";
import { addEvent, showEvents, default as upload1 } from '../controllers/eventController.js';
import checkAuthToken from '../middleware/Auth.js';

const router = express.Router();
const app = express();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Get directory name

router.post('/sign-up', handleUserSignUp);
router.post('/login', handleUserLogIn);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post('/api/addProduct', upload.single("image"), addProduct);

 // Use __dirname here

router.get('/api/showProduct', showProducts);

router.get('/api/searchProduct', searchProducts);
router.post('/api/addEvent', upload1.single("image"), addEvent);
router.use("/eventImages", express.static("eventImages"));
router.get('/api/showEvent', showEvents);
router.get("/check-auth", checkAuthToken, checkAuth);

export default router;
