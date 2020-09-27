import { MY_SQL_HOST, MY_SQL_USER, MY_SQL_PASSWORD } from "@shared/constants";
import { createConnection, Connection } from "mysql";
import { promisify } from "util";
import { dumpImporter } from "./dump-importer";

export const createDatabase = async (database: string, filePath: string) => {
  // Creates a DB based on a Redtail CRM Backup

  const makeCon = () => {
    const connection: Connection = createConnection({
      host: MY_SQL_HOST,
      user: MY_SQL_USER,
      password: MY_SQL_PASSWORD,
    });
    return {
      query(sql: any) {
        return promisify(connection.query).call(connection, sql);
      },
      close() {
        return promisify(connection.end).call(connection);
      },
    };
  };

  const makeDb = () => {
    const connection: Connection = createConnection({
      host: MY_SQL_HOST,
      user: MY_SQL_USER,
      password: MY_SQL_PASSWORD,
      database,
    });
    return {
      query(sql: any) {
        return promisify(connection.query).call(connection, sql);
      },
      close() {
        return promisify(connection.end).call(connection);
      },
    };
  };
  const con = makeCon();
  await con.query(`CREATE DATABASE ${database}`);
  await dumpImporter(
    MY_SQL_HOST,
    // MY_SQL_PORT,
    MY_SQL_USER,
    MY_SQL_PASSWORD,
    database,
    filePath
  );

  const db = makeDb();

  return db;
};
