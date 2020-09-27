import {
  MY_SQL_HOST,
  MY_SQL_PASSWORD,
  MY_SQL_USER,
} from "@shared/constants";
import { createConnection, Connection } from "mysql";
import { promisify } from "util";

//! If the db.close() fails the database doesn't exist

export const connectToDatabase = async (database: string) => {
  // Creates a DB based on a Redtail CRM Backup

  const makeDb = () => {
    const connection: Connection = createConnection({
      host: MY_SQL_HOST,
      user: MY_SQL_USER,
      password: MY_SQL_PASSWORD,
      database,
    });
    return {
      query(sql: any) {
        return promisify(connection.query).call(connection, sql) as any;
      },
      close() {
        return promisify(connection.end).call(connection) as any;
      },
    };
  };

  const db = makeDb();

  return db;
};
