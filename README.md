# GhostRio-PlayGround

My Own Playground

## MY TODO'S

    1. Add fields validation for reg and login
    2. Decrease upload image size autometically

## SECRET KEY RANDOM GENERATOR

    openssl rand -base64 32

## Basic Configuation For Backend

        /* CONFIGURATIONS */
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        dotenv.config();
        const app = express();
        app.use(express.json());
        app.use(helmet());
        app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
        app.use(morgan("common"));
        app.use(bodyParser.json({ limit: "30mb", extended: true }));
        app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
        app.use(cors());
        app.use("/assets", express.static(path.join(__dirname, "public/assets")));

        /* FILE STORAGE */
        const storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, "public/assets");
          },
          filename: function (req, file, cb) {
            cb(null, file.originalname);
          },
        });
        const upload = multer({ storage });
