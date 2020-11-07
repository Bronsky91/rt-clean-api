import { Request, Response, Router } from "express";
import { createDatabase } from "../rt-data/create-database";
import UserModel, { IUser } from "../models/User.model";
import { v4 as uuid } from "uuid";
import { isTokenAuth } from "../shared/utils/tokenAuth";
import { getContactById } from "../rt-api/get-contact-by-id";
import { RedtailContactRec } from "../interfaces/redtail-contact-receive.interface";
import {
  ContactListEntry,
  RedtailContactListRec,
  RedtailSearchParam,
} from "../interfaces/redtail-contact-list.interface";
import { getContactsByPage } from "../rt-api/get-contacts-by-page";
import { searchContactsByParam } from "../rt-api/search-contact";
import { RedtailSettingsData } from "../interfaces/redtail-settings.interface";
import { getStatuses } from "../rt-api/get-statuses";
import { getCategories } from "../rt-api/get-categories";
import { getSources } from "../rt-api/get-sources";
import { getSalutations } from "../rt-api/get-salutations";
import { getServicingAdvisors } from "../rt-api/get-servicing-advisors";
import { getWritingAdvisors } from "../rt-api/get-writing-advisors";
import { RedtailContactUpdate } from "../interfaces/redtail-contact-update.interface";
import { postContact } from "../rt-api/post-contact";
import logger from "../shared/Logger";

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
      const redtailContact: RedtailContactRec = await getContactById(
        userKey,
        req.body.id
      );
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
      const page: number = Number(req.query.page);
      const data: RedtailContactListRec = await getContactsByPage(
        userKey,
        page
      );
      res.json(data);
    } else {
      // Redtail Auth Isn't Setup
      res.sendStatus(401);
    }
    res.end();
  }
);

/******************************************************************************
 *        POST Search Contacts by param filters - "GET /api/rt/search-contacts"
 ******************************************************************************/

router.post(
  "/search-contacts",
  // isTokenAuth,
  async (req: Request, res: Response) => {
    const user: IUser = req.user as IUser;
    const userKey: string | undefined = "233C28BE-0ADE-4092-A2D3-55A59391FBF3";
    const params: RedtailSearchParam = req.body.data
      .params as RedtailSearchParam;
    // user.rtUserkey ||
    // (await UserModel.findOne({ email: user.email }))?.rtUserkey;
    if (userKey) {
      let contactListPromises: Promise<any[]>[] = [];
      for (const [key, values] of Object.entries(params)) {
        const contactSearchPromises: Promise<
          any[]
        >[] = values.map((value: number) =>
          searchContactsByParam(userKey, { [key]: value })
        );
        contactListPromises = [
          ...contactListPromises,
          ...contactSearchPromises,
        ];
      }

      const contactList = await Promise.all(contactListPromises);
      const flatContactList = contactList.reduce(
        (acc, val) => acc.concat(val),
        []
      );

      const uniqueContactList = Array.from(
        new Set(flatContactList.map((contact) => contact.id))
      ).map((contactId) => {
        return flatContactList.filter((c) => c.id === contactId)[0];
      });

      const filteredContactList: ContactListEntry[] = uniqueContactList
        .filter((contact) => {
          for (const [key, values] of Object.entries(params)) {
            // Contact must have either category AND either SourceID
            if (!values.includes(contact[key])) {
              return false;
            }
          }
          return true;
        })
        .map((contact) => ({ id: contact.id, lastName: contact.last_name }));

      res.json(filteredContactList);
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
    status_id: [],
    category_id: [],
    source_id: [],
    salutations: [],
    servicingAdvisors: [],
    writingAdvisors: [],
    genderTypes: [
      { id: 1, name: "Male" },
      { id: 2, name: "Female" },
      { id: 3, name: "Unknown" },
    ],
    addressTypes: [
      { id: 1, name: "Home" },
      { id: 2, name: "Work" },
      { id: 3, name: "Mailing" },
      { id: 4, name: "Other" },
    ],
    emailTypes: [
      { id: 1, name: "Home" },
      { id: 2, name: "Work" },
      { id: 3, name: "Other" },
    ],
    urlTypes: [
      { id: 1, name: "Home" },
      { id: 2, name: "Work" },
      { id: 3, name: "Other" },
    ],
    phoneTypes: [
      { id: 1, name: "Home" },
      { id: 2, name: "Work" },
      { id: 3, name: "Mobile" },
      { id: 4, name: "Fax" },
      { id: 5, name: "Other" },
      { id: 6, name: "Direct Dial" },
      { id: 7, name: "Toll Free" },
    ],
  };

  if (userKey) {
    settingsData.status_id = await getStatuses(userKey);
    settingsData.category_id = await getCategories(userKey);
    settingsData.source_id = await getSources(userKey);
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
    const contact: RedtailContactUpdate = req.body.data.contactUpdate;
    const userKey: string | undefined =
      user.rtUserkey ||
      (await UserModel.findOne({ email: user.email }))?.rtUserkey;
    if (userKey) {
      const result = await postContact(userKey, contact);
      if (result) {
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
