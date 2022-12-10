import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../tmp/uploads");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = new Date().toISOString() + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

export { storage };
