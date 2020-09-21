import { createConnection, Connection } from "mysql";
import { promisify } from "util";
import { dumpImporter } from "./dump-importer";

export const createDatabase = async (database: string, filePath: string) => {
  // Creates a DB based on a Redtail CRM Backup
  const host = "127.0.0.1";
  const user = "root";
  const password = "friend91";

  const makeCon = () => {
    const connection: Connection = createConnection({
      host,
      user,
      password,
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
  const con = makeCon();
  await con.query(`CREATE DATABASE ${database}`);
  await dumpImporter(host, user, password, database, filePath);

  const db = makeDb();

  return db;
};
