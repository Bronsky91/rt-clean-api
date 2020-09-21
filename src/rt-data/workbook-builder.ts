import { Workbook } from "exceljs";

export const workbookBuilder = (tables: string[]): Workbook => {
  const workbook = new Workbook();
  workbook.creator = "LinkPoint Solutions";
  workbook.created = new Date();

  for (const table of tables) {
    // TODO: Figure out what to do with long table names
    if(table.length > 31 || table[0] === 'v') continue;
    // Creates Worksheet for each table
    workbook.addWorksheet(table);
  }
  return workbook;
};
