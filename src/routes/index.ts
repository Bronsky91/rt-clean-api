import { Router } from "express";
import UserRouter from "./Users";
import rtDataRouter from "./RtData";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/users", UserRouter);
router.use("/rt", rtDataRouter);

// Export the base-router
export default router;
