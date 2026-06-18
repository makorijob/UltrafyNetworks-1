import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';

// Define the table type
interface Table {
  name: string;
}

export async function GET() {
  try {
    const dbPath = '/tmp/careers.db';
    
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({
        error: 'Database not found',
        data: [],
      }, { status: 404 });
    }
    
    const db = new Database(dbPath);
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as Table[];
    
    const result: any = {
      tables: tables.map((t) => t.name),
      data: {},
    };
    
    // Get data from each table
    for (const table of tables) {
      const tableName = table.name;
      try {
        const data = db.prepare(`SELECT * FROM ${tableName}`).all();
        result.data[tableName] = data;
      } catch (err) {
        result.data[tableName] = { error: 'Failed to read table' };
      }
    }
    
    db.close();
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to read database' },
      { status: 500 }
    );
  }
         }
