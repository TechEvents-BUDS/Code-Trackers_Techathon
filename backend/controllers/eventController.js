import Event  from "../models/eventModel.js";
import multer from "multer";
import path from "path";

async function showEvents(req, res) {
    try {
        const events = await Event.find()

        if (events.length === 0) {
            return res.status(404).json({ success: false, message: "No Events found." });
        }

        return res.status(200).json({
            success: true,
            message: "Events fetched successfully.",
            events,
        });
    } catch (error) {
        console.error("Error in showEvents:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

async function addEvent(req, res) {
    try {
        const { name, description, category, eventDate, location, organizer, price, available } = req.body;

        if (!name || !description || !category || !eventDate || !location || !organizer || !available ||!req.file) {
            return res.status(400).json({ message: "All fields, including an image, are required." });
        }

        const eventDateObj = new Date(eventDate);
        const today = new Date();
        
        today.setHours(0, 0, 0, 0);
        eventDateObj.setHours(0, 0, 0, 0);

        if (eventDateObj <= today) {
            return res.status(400).json({ message: "Event date must be from tomorrow onward." });
        }

        const imagePath = `/eventImages/${req.file.filename}`;

        const userId = "6760731046411125fbd87b69";

        const newEvent = await Event.create({
            userId,
            name,
            description,
            category,
            eventDate,
            location,
            organizer,
            price,
            available,
            image: imagePath,
        });

        return res.status(201).json({
            success: true,
            message: "Event added successfully!",
            event: newEvent,
        });
    } catch (error) {
        console.error("Error in addEvent:", error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message  });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./eventImages"); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, uniqueName); 
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false); 
    }
};

const upload = multer({ storage, fileFilter });

export { addEvent, showEvents };
export default upload;
