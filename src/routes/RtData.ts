import { Request, Response, Router } from "express";
import { createDatabase } from "../rt-data/create-database";
import { connectToDatabase } from "../rt-data/connect-to-database";
import { createDatabaseName } from "../shared/utils/createDatabaseName";
import { RedtailContact } from "src/interfaces/redtail.interface";
import passport from "passport";

// Init shared
const router = Router();

/******************************************************************************
 *          Upload RT Database Backup File - "POST /api/rt/backup-upload"
 ******************************************************************************/

router.post("/backup-upload", async (req: Request, res: Response) => {
  if (req.files) {
    //! Last name placeholder:
    // const lastName = "r" + Math.random().toString(36).substr(2, 9);
    // TODO: Use user last name from JWT
    // const databaseName = await createDatabaseName(lastName);
    const databaseName = "rtbackup12";
    // TODO: Save databaseName to user
    const filePath = `./tmp-backups/${databaseName}.sql`;
    await req.files.backup.mv(filePath);

    createDatabase(databaseName, filePath);

    res.json({ databaseName });
  }
});

/******************************************************************************
 *          Get Specific Contact - "POST /api/rt/get-contact/"
 ******************************************************************************/

router.post("/get-contact", async (req: Request, res: Response) => {
  // TODO: Get Database name from User - JWT
  const db = await connectToDatabase("rtbackup12");
  const contact: RedtailContact[] = await db.query(
    `SELECT * FROM contacts WHERE id = ${req.body.id}`
  );
  db.close();
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(contact);
});

/******************************************************************************
 *         Get All Contacts - "GET /api/rt/get-contacts"
 ******************************************************************************/

router.get("/get-contacts", async (req: Request, res: Response) => {
  console.log(JSON.stringify(req.user));
  console.log(JSON.stringify(req.body));
  // TODO: Get Database name from User - JWT
  const db = await connectToDatabase("rtbackup12");
  const contacts: RedtailContact[] = await db.query(`SELECT * FROM contacts`);
  db.close();
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ contacts });
});

router.post("/contact-submit", async (req: Request, res: Response) => {
  res.statusCode = 200;
  // TODO: Update new database (for spreadsheet purposes)
  // TODO: Update Contact within Redtail if Auth is setup
  console.log(req.body);
  res.end();
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
