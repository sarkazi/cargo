import express from "express";
import driversController from "../controllers/driversController.js";
import checkRole from "../middlewares/checkRole.js";
import paginationMiddleware from "../middlewares/paginationMiddleware.js";
import Roles from "../enums/roles.js";
import {
  confirmDriverValidator,
  updateDriverValidator,
} from "../validators/drivers.js";
import { passportUpload } from "../config/multer.js";

const router = express.Router();

router.get(
  "/approved",
  checkRole([Roles.MANAGER]),
  paginationMiddleware,
  driversController.getApproved
);
router.get(
  "/unapproved",
  checkRole([Roles.MANAGER]),
  paginationMiddleware,
  driversController.getUnapproved
);
router.put(
  "/:personId",
  checkRole([Roles.MANAGER, Roles.DRIVER]),
  updateDriverValidator,
  driversController.update
);
router.post(
  "/confirm",
  checkRole([Roles.MANAGER]),
  passportUpload.array("photos", 6),
  confirmDriverValidator,
  driversController.confirm
);

export default router;
