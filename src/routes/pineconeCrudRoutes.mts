import express from "express";
import {
  getAllStories,
  upsertStory,
  deleteStory,
  deleteAllStory
} from "../controllers/crudControllers.js";

const router = express.Router();

router.get("/stories", getAllStories);
// router.get("/story/:id", getStory);
router.post("/story", upsertStory);
router.put("/story/:id", upsertStory);
router.delete("/story/:id", deleteStory);
router.delete("/stories", deleteAllStory);

export { router as pineconeCrudRouter };
