import { query } from "./db";

declare global {
  var __schemaReady: Promise<void> | undefined;
}

async function createSchema() {
  await query(`
    CREATE TABLE IF NOT EXISTS KodUser (
      uid INT PRIMARY KEY,
      username VARCHAR(60) NOT NULL UNIQUE,
      email VARCHAR(120) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      balance DECIMAL(15,2) NOT NULL DEFAULT 100000.00,
      phone VARCHAR(20) NOT NULL UNIQUE,
      role ENUM('Customer', 'manager', 'admin') NOT NULL DEFAULT 'Customer'
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS UserToken (
      tid BIGINT PRIMARY KEY AUTO_INCREMENT,
      token TEXT NOT NULL,
      uid INT NOT NULL,
      expairy DATETIME NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uid) REFERENCES KodUser(uid) ON DELETE CASCADE
    )
  `);
}

export async function ensureSchema() {
  if (!global.__schemaReady) {
    global.__schemaReady = createSchema();
  }

  await global.__schemaReady;
}
