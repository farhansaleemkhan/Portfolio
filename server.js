import app from "./app.js";
import dotenv from 'dotenv';
import myConnection from "../portfolio/connections/connection.js";

dotenv.config();
const port = process.env.PORT;

myConnection()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




