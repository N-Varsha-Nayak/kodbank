function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function getDbConfig() {
  const databaseUrl =
    process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.SERVICE_URI;

  if (databaseUrl) {
    const parsed = new URL(databaseUrl);
    const dbName = parsed.pathname.replace("/", "");
    return {
      host: parsed.hostname,
      port: Number(parsed.port || "3306"),
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: dbName || "defaultdb",
    };
  }

  return {
    host: getEnv("DB_HOST"),
    port: Number(getEnv("DB_PORT")),
    user: getEnv("DB_USER"),
    password: getEnv("DB_PASSWORD"),
    database: getEnv("DB_NAME"),
  };
}

export function getJwtSecret() {
  return getEnv("JWT_SECRET");
}
