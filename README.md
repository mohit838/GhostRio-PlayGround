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

## Basic STATUS Code

Here are some commonly used HTTP status codes that you may encounter in backend development:

1. **Informational Responses (1xx):**

- `100 Continue`
- `101 Switching Protocols`
- `102 Processing`

2. **Successful Responses (2xx):**

- `200 OK`
- `201 Created`
- `202 Accepted`
- `204 No Content`

3. **Redirection Messages (3xx):**

- `300 Multiple Choices`
- `301 Moved Permanently`
- `302 Found`
- `304 Not Modified`
- `307 Temporary Redirect`
- `308 Permanent Redirect`

4. **Client Error Responses (4xx):**

- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `422 Unprocessable Entity`
- `429 Too Many Requests`

5. **Server Error Responses (5xx):**

- `500 Internal Server Error`
- `501 Not Implemented`
- `502 Bad Gateway`
- `503 Service Unavailable`
- `504 Gateway Timeout`
- `505 HTTP Version Not Supported`

These are just a few examples of common status codes. There are many more status codes available for specific scenarios or custom use cases. It's important to choose the appropriate status code that accurately reflects the outcome of the request.

Please note that the appropriate status code to use depends on the specific situation and the HTTP specification. Always consult the HTTP specification or relevant documentation for more detailed information on each status code.

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

## All Routers Can Declear At a Time

    const routerPath = readdirSync("./routes");
    routerPath.forEach(async (route) => {
       try {
            const routeModule = await import(`./routes/${route}`);
           app.use("/api", routeModule.default);
        } catch (error) {
           console.error(`Error importing route module ${route}:`, error);
      }
    });

## Study Materials TUT

      npm i express nodemon cors dotenv mongoose multer bcrypt jsonwebtoken body-parser nodemailer randomstring joi joi-password-complexity
