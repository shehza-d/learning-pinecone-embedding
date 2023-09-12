import express from "express";
import {
  getAllStories,
  addStory,
  updateStory,
  deleteStory,
} from "../controllers/crudControllers.js";

const router = express.Router();

router.get("/stories", getAllStories);
// router.get("/story/:id", getStory);
router.post("/story", addStory);
router.put("/story/:id", updateStory);
router.delete("/story/:id", deleteStory);

export { router as pineconeCrudRouter };
