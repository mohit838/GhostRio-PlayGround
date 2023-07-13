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

## Here are some commonly used MongoDB commands and operations

1. **Querying Documents**:

   - `find`: Retrieves multiple documents based on a query filter.
   - `findOne`: Retrieves a single document based on a query filter.
   - `findById`: Retrieves a document by its unique identifier.
   - `count`: Counts the number of documents that match a query filter.

2. **Inserting Documents**:

   - `insertOne`: Inserts a single document into a collection.
   - `insertMany`: Inserts multiple documents into a collection.

3. **Updating Documents**:

   - `updateOne`: Updates a single document that matches a query filter.
   - `updateMany`: Updates multiple documents that match a query filter.
   - `findByIdAndUpdate`: Finds a document by its unique identifier and updates it.
   - `findOneAndUpdate`: Finds a single document that matches a query filter and updates it.

4. **Deleting Documents**:

   - `deleteOne`: Deletes a single document that matches a query filter.
   - `deleteMany`: Deletes multiple documents that match a query filter.
   - `findByIdAndDelete`: Finds a document by its unique identifier and deletes it.
   - `findOneAndDelete`: Finds a single document that matches a query filter and deletes it.

5. **Aggregation**:

   - `aggregate`: Performs aggregation operations on the documents in a collection.
   - Aggregation stages: `$match`, `$group`, `$sort`, `$project`, `$lookup`, `$unwind`, etc.

6. **Indexes**:

   - `createIndex`: Creates an index on a collection.
   - `dropIndex`: Drops an index from a collection.

7. **Transactions**:

   - `startSession`: Starts a new session for multi-document transactions.
   - `withTransaction`: Executes a set of operations within a transaction.

8. **Others**:
   - `distinct`: Returns an array of distinct values for a specified field.
   - `aggregate`: Performs data aggregation operations on the documents in a collection.
   - `bulkWrite`: Performs multiple write operations in bulk.

These are just a few examples of MongoDB commands and operations. MongoDB provides a rich set of commands and features to interact with the database, and the available commands may vary depending on the MongoDB version and the specific driver or framework you are using. It's recommended to refer to the official MongoDB documentation for a comprehensive list of commands and their usage details.

## Base Template For Controllers

    try {
        if (isValue) {
          //Other Functionalities


          return res.status(200).json({
                  errors: [
                    { msg: "Custom Msg!", param: "fieldName", success: true },
                  ],
          });
        } else {
          return res.status(401).json({
            errors: [
              { msg: `${isValue} is not found!`, param: "isValue", success: false },
            ],
          });
        }
      } catch (error) {
        console.log(error.message);
        return res.status(500).json("Server Inernal error!");
      }
