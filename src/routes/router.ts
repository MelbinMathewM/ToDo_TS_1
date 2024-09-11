import express from "express";
import * as taskController from "../controllers/taskController";

const router = express.Router();

router.get('/',taskController.loadList);
router.post('/create',taskController.addTask);
router.patch('/mark',taskController.completeTask);
router.put('/update',taskController.editTask);
router.delete('/remove/:id',taskController.deleteTask);

export default router;