import { promises as fs } from 'fs';
import path from 'path';
import { query } from '../config/database';

async function initializeDatabase() {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = await fs.readFile(schemaPath, 'utf-8');
    
    console.log('Dropping existing tables...');
    await query('DROP TABLE IF EXISTS reviews, comments, submissions, project_members, projects, users CASCADE;');
    
    console.log('Creating tables...');
    await query(schemaSQL);
    
    console.log('Database initialization complete.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
