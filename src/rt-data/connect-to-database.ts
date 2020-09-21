import { createConnection, Connection } from "mysql";
import { promisify } from "util";

//! If the db.close() fails the database doesn't exist

export const connectToDatabase = async (database: string) => {
  // Creates a DB based on a Redtail CRM Backup
  const host = "127.0.0.1";
  const user = "root";
  const password = "friend91";

const makeDb = () => {
    const connection: Connection = createConnection({
      host,
      user,
      password,
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

  const db = makeDb();

  return db;
};
