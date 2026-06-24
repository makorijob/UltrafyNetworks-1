import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';

// Use in-memory database for Vercel compatibility
let db: Database.Database | null = null;
let isInitialized = false;

function getDb() {
  if (!db) {
    db = new Database(':memory:');
    db.pragma('journal_mode = WAL');
  }
  return db;
}

function initializeDatabase() {
  if (isInitialized) return;
  
  try {
    const db = getDb();
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        department TEXT NOT NULL,
        location TEXT NOT NULL,
        type TEXT NOT NULL,
        icon TEXT DEFAULT 'Wrench',
        desc TEXT NOT NULL,
        status TEXT DEFAULT 'open',
        posted_date TEXT DEFAULT CURRENT_DATE
      )
    `);
    
    // Check if table has data
    const countStmt = db.prepare('SELECT COUNT(*) as count FROM roles');
    const result = countStmt.get() as { count: number };
    
    if (result.count === 0) {
      console.log('📊 Inserting sample career data...');
      
      const insertStmt = db.prepare(`
        INSERT INTO roles (title, department, location, type, icon, desc, status, posted_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const sampleRoles = [
        ['Field Technician', 'Network Operations', 'Thika', 'Full-time', 'Wrench', 'Install and maintain fibre connections for homes and businesses.', 'open', '2026-06-01'],
        ['Customer Support Agent', 'Customer Experience', 'Thika', 'Full-time', 'Headset', 'Be the first voice customers hear — handle billing questions.', 'open', '2026-06-10'],
        ['Sales Representative', 'Sales & Marketing', 'Thika', 'Full-time', 'TrendingUp', 'Help grow our customer base across Thika.', 'open', '2026-06-15']
      ];
      
      const insertMany = db.transaction((roles: any[][]) => {
        for (const role of roles) {
          insertStmt.run(role);
        }
      });
      
      insertMany(sampleRoles);
      console.log('✅ Sample career data inserted into memory!');
    }
    
    isInitialized = true;
  } catch (error) {
    console.error('❌ Error initializing careers database:', error);
  }
}

// GET: Fetch all roles
export async function GET(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const id = searchParams.get('id');
    
    const db = getDb();
    
    // If specific ID is requested
    if (id) {
      const stmt = db.prepare('SELECT * FROM roles WHERE id = ?');
      const result = stmt.get(parseInt(id));
      
      if (!result) {
        return NextResponse.json(
          { success: false, error: 'Job not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: result,
      });
    }
    
    let stmt;
    if (status === 'all') {
      stmt = db.prepare('SELECT * FROM roles ORDER BY posted_date DESC');
    } else {
      stmt = db.prepare('SELECT * FROM roles WHERE status = ? ORDER BY posted_date DESC');
    }
    
    const result = status === 'all' ? stmt.all() : stmt.all(status);
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job openings: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// POST: Create a new job
export async function POST(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    const { title, department, location, type, icon, desc } = body;
    
    if (!title || !department || !location || !type || !desc) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO roles (title, department, location, type, icon, desc, status, posted_date)
      VALUES (?, ?, ?, ?, ?, ?, 'open', date('now'))
    `);
    
    const info = stmt.run(title, department, location, type, icon || 'Wrench', desc);
    
    const getStmt = db.prepare('SELECT * FROM roles WHERE id = ?');
    const newRole = getStmt.get(info.lastInsertRowid);
    
    return NextResponse.json({
      success: true,
      data: newRole,
      message: 'Job created successfully',
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT: Update a job
export async function PUT(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    const { id, title, department, location, type, icon, desc, status } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    
    // Check if job exists
    const checkStmt = db.prepare('SELECT * FROM roles WHERE id = ?');
    const existing = checkStmt.get(parseInt(id));
    
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }
    
    const updates: string[] = [];
    const values: any[] = [];
    
    if (title) { updates.push('title = ?'); values.push(title); }
    if (department) { updates.push('department = ?'); values.push(department); }
    if (location) { updates.push('location = ?'); values.push(location); }
    if (type) { updates.push('type = ?'); values.push(type); }
    if (icon) { updates.push('icon = ?'); values.push(icon); }
    if (desc) { updates.push('desc = ?'); values.push(desc); }
    if (status) { updates.push('status = ?'); values.push(status); }
    
    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }
    
    values.push(parseInt(id));
    const query = `UPDATE roles SET ${updates.join(', ')} WHERE id = ?`;
    
    const stmt = db.prepare(query);
    const result = stmt.run(...values);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to update job' },
        { status: 500 }
      );
    }
    
    const getStmt = db.prepare('SELECT * FROM roles WHERE id = ?');
    const updatedRole = getStmt.get(parseInt(id));
    
    return NextResponse.json({
      success: true,
      data: updatedRole,
      message: 'Job updated successfully',
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update job: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a job
export async function DELETE(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    
    // Check if job exists
    const checkStmt = db.prepare('SELECT * FROM roles WHERE id = ?');
    const existing = checkStmt.get(parseInt(id));
    
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare('DELETE FROM roles WHERE id = ?');
    const result = stmt.run(parseInt(id));
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete job' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete job: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
