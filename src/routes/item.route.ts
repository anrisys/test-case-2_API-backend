import { Router } from "express";
import { ItemController } from "../controllers/ItemController";

const router = Router();

const controller = new ItemController();

router.get("/data", controller.getAllItems.bind(controller));
router.post("/create", controller.createItem.bind(controller));
router.put("/:itemId", controller.updateItem.bind(controller));
router.delete("/:itemId", controller.deleteItem.bind(controller));

export { router as itemRoutes };
