import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/db";

const startServer = async () => {
    const port = config.port || 3000;

    await connectDB();

    app.listen(port, () => {
        console.log(`listening on the port http://localhost:${port}`)
    })
}

startServer();
