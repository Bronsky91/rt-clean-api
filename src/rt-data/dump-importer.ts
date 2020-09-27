const Importer = require("mysql-import");
import fs from "fs";

export const dumpImporter = (
  host: string,
  user: string,
  password: string,
  database: string,
  filePath: string
) => {
  const importer = new Importer({ host, user, password, database });
  return importer
    .import(filePath)
    .then(() => {
      var files_imported = importer.getImported();
      console.log(`${files_imported.length} SQL file(s) imported.`);

      try {
        fs.unlinkSync(filePath);
        // file removed
      } catch (err) {
        console.error(err);
      }
    })
    .catch((err: any) => {
      console.error(err);
    });
};
