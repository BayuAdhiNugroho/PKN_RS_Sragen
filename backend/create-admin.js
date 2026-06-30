const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (item === '--username' || item === '-u') {
      args.username = argv[i + 1];
    } else if (item === '--password' || item === '-p') {
      args.password = argv[i + 1];
    }
  }
  return args;
}

function parseDatabaseUrl(url) {
  if (!url) {
    throw new Error('DATABASE_URL is not defined. Please set it in backend/.env');
  }

  try {
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: Number(parsed.port || 3306),
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ''),
    };
  } catch (error) {
    throw new Error(`Invalid DATABASE_URL: ${url}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const username = args.username || process.env.ADMIN_USERNAME || 'admin';
  const password = args.password || process.env.ADMIN_PASSWORD || 'admin123';
  const dbConfig = parseDatabaseUrl(process.env.DATABASE_URL);

  const connection = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  });

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute(
      `
        INSERT INTO admins (username, password)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE password = VALUES(password), created_at = CURRENT_TIMESTAMP
      `,
      [username, hashedPassword]
    );

    console.log(`Admin account created successfully.`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log('You can now login from the admin page.');
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error('Failed to create admin account.');
  console.error(error.message);
  process.exit(1);
});
