import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { createDatabase } from '../rt-data/create-database'
import { connectToDatabase } from '../rt-data/connect-to-database'
import path from 'path'

import UserDao from "@daos/User/UserDao.mock";
import { RedtailContact } from 'src/interfaces/redtail.interface';

// Init shared
const router = Router();
const userDao = new UserDao();

/******************************************************************************
 *          Upload RT Database Backup File - "POST /api/rt/backup-upload"
 ******************************************************************************/

router.post("/backup-upload", async (req: Request, res: Response) => {
  if(req.files) {
    // TODO: Base database name on unique User data
    const databaseName = 'rtbackup12'
    const filePath = `./tmp-backups/${databaseName}.sql`
    await req.files.backup.mv(filePath)

    // TODO: With larger databases this probably won't fly
    createDatabase(databaseName, filePath)

    res.json({ databaseName })
  }
});

/******************************************************************************
 *          Get Specific Contact - "POST /api/rt/get-contact/"
 ******************************************************************************/

router.post("/get-contact", async (req: Request, res: Response) => {
  const db = await connectToDatabase("rtbackup12");
  const contact: RedtailContact[] = await db.query(`SELECT * FROM contacts WHERE id = ${req.body.id}`);
  db.close();
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(contact);
});

/******************************************************************************
 *         Get All Contacts - "GET /api/rt/get-contacts"
 ******************************************************************************/

router.get("/get-contacts", async (req: Request, res: Response) => {
  const db = await connectToDatabase("rtbackup12");
  const contacts: RedtailContact[] = await db.query(`SELECT * FROM contacts`);
  db.close();
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({contacts});
})

router.post("/contact-submit", async (req: Request, res: Response) => {
  res.statusCode = 200;
  // TODO: Update new database (for spreadsheet purposes)
  // TODO: Update Contact within Redtail
  console.log(req.body);
  res.end();
})


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
