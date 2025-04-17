import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import errorMiddleware from "../middleware/error.middleware";
import { itemRoutes } from "../routes/item.route";

dotenv.config();

export const createApp = (): Application => {
  const app: Application = express();

  app.use(express.json());
  app.use(cors());

  app.use("/api/barang", itemRoutes);
  app.use(errorMiddleware);

  return app;
};

export const startServer = (app: Application) => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

const app = createApp();
startServer(app);

/*
// Only start the server if this file is executed directly
if (require.main === module) {
  const app = createApp();
  startServer(app);
}
*/
