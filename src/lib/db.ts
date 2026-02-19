import mysql, { Pool, RowDataPacket } from "mysql2/promise";
import { getDbConfig } from "./env";

declare global {
  var __kodbankPool: Pool | undefined;
}

export function getPool() {
  if (!global.__kodbankPool) {
    const config = getDbConfig();
    global.__kodbankPool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      ssl: {
        rejectUnauthorized: false,
      },
      connectionLimit: 10,
    });
  }

  return global.__kodbankPool;
}

export async function query<T extends RowDataPacket[]>(
  sql: string,
  values: unknown[] = []
) {
  const pool = getPool();
  const [rows] = await pool.query<T>(sql, values);
  return rows;
}
