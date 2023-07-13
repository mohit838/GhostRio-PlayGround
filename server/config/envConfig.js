import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_CODE = "Q7zZMt6zwZYLx6GA87j2/aah1qp/pyd2vmQ0NZD/fbM=";

export { JWT_CODE, MONGO_URL, PORT };
