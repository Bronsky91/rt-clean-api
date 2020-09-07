import { Request, Response, Router } from "express";
import { OK } from "http-status-codes";

import UserDao from "@daos/User/UserDao.mock";

// Init shared
const router = Router();
const userDao = new UserDao();

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  const users = await userDao.getAll();
  return res.status(OK).json({ users });
});

router.post("/update", async (req: Request, res: Response) => {
  console.log(req.body);
  return res.status(OK);
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
