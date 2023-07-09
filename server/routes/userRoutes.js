import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import { registerUser } from '../controllers/userController.js';

const app = express();
const router = express.Router();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.static('public'));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  },
});
const upload = multer({ storage });

router.post('/register', upload.single('image'), registerUser);

export default router;
