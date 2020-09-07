import { Router } from "express";
import UserRouter from "./Users";
import ContactRouter from "./Contacts";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/users", UserRouter);
router.use("/contacts", ContactRouter);

// Export the base-router
export default router;
