const Importer = require("mysql-import");

export const dumpImporter = (
  host: string,
  user: string,
  password: string,
  database: string,
  filePath: string
) => {
  const importer = new Importer({ host, user, password, database });
  console.log(importer)
  console.log(filePath)
  return importer
    .import(filePath)
    .then(() => {
      var files_imported = importer.getImported();
      console.log(`${files_imported.length} SQL file(s) imported.`);
    })
    .catch((err: any) => {
      console.error(err);
    });
};
