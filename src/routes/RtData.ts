import { Request, Response, Router } from "express";
import { createDatabase } from "../rt-data/create-database";
import { connectToDatabase } from "../rt-data/connect-to-database";
import { RedtailContact } from "src/interfaces/redtail.interface";
import { isTokenAuth } from "@shared/utils/tokenAuth";
import UserModel, { IUser } from "src/models/User.model";

// Init shared
const router = Router();

/******************************************************************************
 *          Upload RT Database Backup File - "POST /api/rt/backup-upload"
 ******************************************************************************/

router.post(
  "/backup-upload",
  isTokenAuth,
  async (req: Request, res: Response) => {
    const user: IUser = req.user as IUser;
    const databaseName = user.databaseName;
    if (req.files) {
      const filePath = `./tmp-backups/${databaseName}.sql`;

      await req.files.backup.mv(filePath);

      createDatabase(databaseName, filePath);
      UserModel.updateOne({ email: user.email }, { databaseName });

      res.json({ databaseName });
    }
  }
);

/******************************************************************************
 *          Get Specific Contact - "POST /api/rt/get-contact/"
 ******************************************************************************/

router.post(
  "/get-contact",
  isTokenAuth,
  async (req: Request, res: Response) => {
    const user: IUser = req.user as IUser;

    const db = await connectToDatabase(user.databaseName);
    const contact: RedtailContact[] = await db.query(
      `SELECT * FROM contacts WHERE id = ${req.body.id}`
    );
    db.close();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(contact);
  }
);

/******************************************************************************
 *         Get All Contacts - "GET /api/rt/get-contacts"
 ******************************************************************************/

router.get(
  "/get-contacts",
  isTokenAuth,
  async (req: Request, res: Response) => {
    const user: IUser = req.user as IUser;

    const db = await connectToDatabase(user.databaseName);
    const contacts: RedtailContact[] = await db.query(`SELECT * FROM contacts`);
    db.close();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ contacts });
  }
);

router.post(
  "/contact-submit",
  isTokenAuth,
  async (req: Request, res: Response) => {
    res.statusCode = 200;
    // TODO: Update new database (for spreadsheet purposes)
    // TODO: Update Contact within Redtail if Auth is setup
    console.log(req.body);
    res.end();
  }
);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
