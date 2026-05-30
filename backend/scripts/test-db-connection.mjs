import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function testConnection() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL is not set in .env');
    process.exit(1);
  }

  console.log('Testing DB URL:', url.replace(/:\/\/.*@/, '://<REDACTED>@'));

  try {
    const conn = await mysql.createConnection(url);
    const [rows] = await conn.query('SELECT 1 as ok');
    console.log('Query result:', rows);
    await conn.end();
    console.log('DB connection successful');
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
}

testConnection();
