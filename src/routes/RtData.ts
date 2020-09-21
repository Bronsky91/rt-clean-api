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
    const databaseName = 'rtbackup11'
    const filePath = `./tmp-backups/${databaseName}.sql`
    await req.files.backup.mv(filePath)

    
    // const db = await connectToDatabase(databaseName);
    try{
      // TODO: With larger databases this await won't fly
      await createDatabase(databaseName, filePath);

      res.json({ databaseName });
    } catch(e) {
      res.json({fail: true})
    }

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
