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
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        area TEXT NOT NULL,
        quote TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Check if table has data
    const countStmt = db.prepare('SELECT COUNT(*) as count FROM testimonials');
    const result = countStmt.get() as { count: number };
    
    if (result.count === 0) {
      console.log('📊 Inserting sample testimonial data...');
      
      const insertStmt = db.prepare(`
        INSERT INTO testimonials (name, area, quote, rating, status) 
        VALUES (?, ?, ?, ?, ?)
      `);
      
      const sampleTestimonials = [
        ['Grace Wanjiru', 'Weitethie', 'Switched from mobile data and never looked back. My kids\' online classes run without a single freeze now.', 5, 'approved'],
        ['Peter Mwangi', 'Ngoingwa', 'Installation took less than two hours and support actually picks up the phone when I call.', 5, 'approved'],
        ['Sarah Akinyi', 'Section 9', 'The 30 Mbps plan handles three of us streaming at once with no lag. Best decision for our home this year.', 5, 'approved'],
        ['James Kariuki', 'Thika Town', 'The fibre connection is incredibly fast. I can work from home without any interruptions.', 5, 'pending'],
        ['Mary Wanjiku', 'Gatukuyu', 'Finally got reliable internet in my area. The team was professional and the setup was quick.', 4, 'pending'],
      ];
      
      const insertMany = db.transaction((testimonials: any[][]) => {
        for (const t of testimonials) {
          insertStmt.run(t);
        }
      });
      
      insertMany(sampleTestimonials);
      console.log('✅ Sample testimonial data inserted into memory!');
    }
    
    isInitialized = true;
  } catch (error) {
    console.error('❌ Error initializing testimonials database:', error);
  }
}

// GET: Fetch all reviews
export async function GET() {
  try {
    initializeDatabase();
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC');
    const result = stmt.all();
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT: Update review status
export async function PUT(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    console.log('📝 PUT request body:', body);
    
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: id and status' },
        { status: 400 }
      );
    }
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Must be pending, approved, or rejected' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    
    // Check if review exists
    const checkStmt = db.prepare('SELECT * FROM testimonials WHERE id = ?');
    const existing = checkStmt.get(parseInt(id));
    
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Review with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare('UPDATE testimonials SET status = ? WHERE id = ?');
    const result = stmt.run(status, parseInt(id));
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to update review' },
        { status: 500 }
      );
    }
    
    // Get updated review
    const getStmt = db.prepare('SELECT * FROM testimonials WHERE id = ?');
    const updatedReview = getStmt.get(parseInt(id));
    
    return NextResponse.json({
      success: true,
      data: updatedReview,
      message: `Review ${status} successfully`,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update review: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a review
export async function DELETE(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    console.log('🗑️ DELETE request, id:', id);
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID required' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    
    // Check if review exists
    const checkStmt = db.prepare('SELECT * FROM testimonials WHERE id = ?');
    const existing = checkStmt.get(parseInt(id));
    
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Review with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare('DELETE FROM testimonials WHERE id = ?');
    const result = stmt.run(parseInt(id));
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete review' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete review: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
