import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { createDatabase } from '../rt-data/create-database'
import { connectToDatabase } from '../rt-data/connect-to-database'
import path from 'path'

import UserDao from "@daos/User/UserDao.mock";

// Init shared
const router = Router();
const userDao = new UserDao();

/******************************************************************************
 *          Upload RT Database Backup File - "POST /api/rt/backup-upload"
 ******************************************************************************/

router.post("/backup-upload", async (req: Request, res: Response) => {
  if(req.files) {
    // TODO: Base database name on unique User data
    const databaseName = 'rtbackup10'
    const filePath = `./tmp-backups/${databaseName}.sql`
    await req.files.backup.mv(filePath)

    const db = await createDatabase(databaseName, filePath);
    // const test = await connectToDatabase(databaseName);
    console.log(await db.query("SHOW TABLES"))
    res.statusCode = 200;
    res.json({ databaseName });
  }
});

router.post("/update", async (req: Request, res: Response) => {
  console.log(req.body);
  return res.status(StatusCodes.OK);
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
