import { Request, Response, Router } from "express";
import { createDatabase } from "../rt-data/create-database";
import { connectToDatabase } from "../rt-data/connect-to-database";
import {
  RedtailContactUpdate,
  RedtailSettingsData,
} from "src/interfaces/redtail.interface";
import { isTokenAuth } from "@shared/utils/tokenAuth";
import UserModel, { IUser } from "src/models/User.model";
import logger from "@shared/Logger";
import { v4 as uuid } from "uuid";
import RtDatabaseModel from "src/models/RtDatabase.model";
import { getContactsByPage } from "src/rt-api/get-contacts-by-page";
import { getContactById } from "src/rt-api/get-contact-by-id";
import { postContact } from "src/rt-api/post-contact";
import { settings } from "cluster";
import { getStatuses } from "src/rt-api/get-statuses";
import { getCategories } from "src/rt-api/get-categories";
import { getSources } from "src/rt-api/get-sources";
import { getSalutations } from "src/rt-api/get-salutations";
import { getServicingAdvisors } from "src/rt-api/get-servicing-advisors";
import { getWritingAdvisors } from "src/rt-api/get-writing-advisors";

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
    // if (user.databaseName) {
    //   return res
    //     .status(500)
    //     .send("User already has an active Database assigned");
    // }

    const databaseName: string = uuid();

    if (req.files) {
      const filePath = `./tmp-backups/${databaseName}.sql`;

      await req.files.backup.mv(filePath);
      createDatabase(databaseName, filePath).then(() => {
        // RtDatabaseModel.create({ databaseName })
        //   .then(() =>
        //     UserModel.updateOne(
        //       { email: user.email },
        //       { $set: { databaseName } }
        //     ).exec()
        //   )
        //   .catch((e) => logger.error(e));
      });

      res.sendStatus(200);
    }
  }
);

router.get(
  "/check-backup-upload",
  isTokenAuth,
  async (req: Request, res: Response) => {
    const user: IUser = req.user as IUser;
    const dbUser = await UserModel.findOne({ email: user.email });
    dbUser?.databaseName ? res.sendStatus(200) : res.sendStatus(201);
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
    const userKey: string | undefined =
      user.rtUserkey ||
      (await UserModel.findOne({ email: user.email }))?.rtUserkey;
    if (userKey) {
      const results = await getContactById(userKey, req.body.id);
      res.json(results.data);
    } else {
      // Redtail Auth Isn't Setup
      res.sendStatus(401);
    }
    res.end();
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
    const userKey: string | undefined =
      user.rtUserkey ||
      (await UserModel.findOne({ email: user.email }))?.rtUserkey;
    if (userKey) {
      const contacts = await getContactsByPage(userKey, 1);
      res.json({ contacts });
    } else {
      // Redtail Auth Isn't Setup
      res.sendStatus(401);
    }
    res.end();
  }
);

router.get("/dropdowns", isTokenAuth, async (req: Request, res: Response) => {
  const user: IUser = req.user as IUser;
  const userKey: string | undefined =
    user.rtUserkey ||
    (await UserModel.findOne({ email: user.email }))?.rtUserkey;

  const settingsData: RedtailSettingsData = {
    statuses: [],
    categories: [],
    sources: [],
    salutations: [],
    servicingAdvisors: [],
    writingAdvisors: [],
    gender: [{ Gender: "Male" }, { Gender: "Female" }, { Gender: "Unknown" }],
  };

  if (userKey) {
    settingsData.statuses = await getStatuses(userKey);
    settingsData.categories = await getCategories(userKey);
    settingsData.sources = await getSources(userKey);
    settingsData.salutations = await getSalutations(userKey);
    settingsData.servicingAdvisors = await getServicingAdvisors(userKey);
    settingsData.writingAdvisors = await getWritingAdvisors(userKey);

    res.json(settingsData);
  } else {
    // Redtail Auth Isn't Setup
    res.sendStatus(401);
  }
});

/******************************************************************************
 *          Update Specific Contact - "PUT /api/rt/contact-submit/"
 ******************************************************************************/

router.post(
  "/contact-submit",
  isTokenAuth,
  async (req: Request, res: Response) => {
    const user: IUser = req.user as IUser;
    const contact: RedtailContactUpdate = req.body.data.contact;
    const userKey: string | undefined =
      user.rtUserkey ||
      (await UserModel.findOne({ email: user.email }))?.rtUserkey;
    if (userKey) {
      const results = await postContact(userKey, contact);
      if (results == 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    } else {
      // Redtail Auth Isn't Setup
      res.sendStatus(401);
    }
    res.end();
  }
);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
