import { Request, Response, Router } from "express";
import { createDatabase } from "../rt-data/create-database";
import {
  RedtailContactRec,
} from "src/interfaces/redtail-contact.interface";
import { isTokenAuth } from "@shared/utils/tokenAuth";
import UserModel, { IUser } from "src/models/User.model";
import { v4 as uuid } from "uuid";
import { getContactsByPage } from "src/rt-api/get-contacts-by-page";
import { getContactById } from "src/rt-api/get-contact-by-id";
import { postContact } from "src/rt-api/post-contact";
import { getStatuses } from "src/rt-api/get-statuses";
import { getCategories } from "src/rt-api/get-categories";
import { getSources } from "src/rt-api/get-sources";
import { getSalutations } from "src/rt-api/get-salutations";
import { getServicingAdvisors } from "src/rt-api/get-servicing-advisors";
import { getWritingAdvisors } from "src/rt-api/get-writing-advisors";
import { RedtailContactListRec } from 'src/interfaces/redtail-contact-list.interface';
import { RedtailContactUpdate } from 'src/interfaces/redtail-contact-update.interface';
import { RedtailSettingsData } from 'src/interfaces/redtail-settings.interface';

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
 *          Get Specific Contact - "POST /api/rt/get-contact"
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
      const redtailContact: RedtailContactRec = await getContactById(userKey, req.body.id)
      res.json(redtailContact);
    } else {
      // Redtail Auth Isn't Setup
      res.sendStatus(401);
    }
    res.end();
  }
);


/******************************************************************************
 *        Get Specific Page of Contacts - "GET /api/rt/get-contacts"
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
      const page: number = Number(req.query.page)
      const data: RedtailContactListRec = await getContactsByPage(userKey, page);
      res.json(data);
    } else {
      // Redtail Auth Isn't Setup
      res.sendStatus(401);
    }
    res.end();
  }
);

/******************************************************************************
 *         Get Dropdown Data - "GET /api/rt/dropdowns"
 ******************************************************************************/

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
    gender: [{ id: "Male", name: "Male" }, { id: "Female", name: "Female" }, { id: "Unknown", name: "Unknown" }],
    addressTypes: [
      { Description: "Home", TypeID: "H" },
      { Description: "Mailing", TypeID: "M" },
      { Description: "Other", TypeID: "O" },
      { Description: "Work", TypeID: "W" },
    ],
    internetTypes: [
      { Description: "Home", TypeID: 1 },
      { Description: "Work", TypeID: 2 },
      { Description: "Other", TypeID: 3 },
    ],
    phoneTypes: [
      { Description: "Direct Dial", TypeID: "DD" },
      { Description: "Fax", TypeID: "WF" },
      { Description: "Home", TypeID: "HM" },
      { Description: "Mobile", TypeID: "CL" },
      { Description: "Other", TypeID: "OT" },
      { Description: "Toll Free", TypeID: "TF" },
      { Description: "Work", TypeID: "WK" },
    ],
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
 *          Update Specific Contact - "PUT /api/rt/contact-submit"
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
