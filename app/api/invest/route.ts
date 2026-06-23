import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'invest.db');

function initializeDatabase() {
  try {
    const dbExists = fs.existsSync(DB_PATH);
    const db = new Database(DB_PATH);
    
    if (!dbExists) {
      db.exec(`
        CREATE TABLE IF NOT EXISTS investment_opportunities (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          category TEXT DEFAULT 'Infrastructure',
          icon TEXT DEFAULT 'TrendingUp',
          min_investment TEXT DEFAULT '50,000',
          expected_return TEXT DEFAULT '15%',
          duration TEXT DEFAULT '12 months',
          image TEXT DEFAULT '/images/invest/default.jpg',
          features TEXT DEFAULT '[]',
          status TEXT DEFAULT 'active',
          featured INTEGER DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      const insertStmt = db.prepare(`
        INSERT INTO investment_opportunities (
          title, description, category, icon, min_investment, 
          expected_return, duration, image, features, status, featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const sampleInvestments = [
        [
          'Fibre Network Expansion',
          'Help us expand our fibre internet network to underserved areas in Thika and surrounding regions. This investment will fund new infrastructure and equipment.',
          'Infrastructure',
          'TrendingUp',
          '100,000',
          '20%',
          '18 months',
          '/images/invest/fibre-expansion.jpg',
          JSON.stringify(['New fibre infrastructure', 'Network equipment', 'Installation teams', '3-year growth plan']),
          'active',
          1
        ],
        [
          'Solar Energy Partnership',
          'Invest in solar energy solutions for homes and businesses. We\'re partnering with leading solar providers to offer affordable, sustainable energy.',
          'Energy',
          'Sun',
          '50,000',
          '15%',
          '12 months',
          '/images/invest/solar-partnership.jpg',
          JSON.stringify(['Solar panel installation', 'Battery storage', 'Maintenance services', 'Government incentives']),
          'active',
          0
        ],
        [
          'Smart Security Solutions',
          'Expanding our security services with smart technology. Investment will fund new CCTV systems, AI-powered monitoring, and electric fence installations.',
          'Security',
          'Shield',
          '75,000',
          '18%',
          '15 months',
          '/images/invest/security-solutions.jpg',
          JSON.stringify(['AI-powered CCTV', 'Smart monitoring', 'Electric fence systems', '24/7 support']),
          'active',
          1
        ],
        [
          'Community WiFi Hubs',
          'Establish WiFi hotspots in rural areas, providing affordable internet access to communities. This social enterprise project offers both impact and returns.',
          'Connectivity',
          'Wifi',
          '30,000',
          '12%',
          '10 months',
          '/images/invest/community-wifi.jpg',
          JSON.stringify(['WiFi equipment', 'Community centers', 'Digital literacy training', 'Sustainable model']),
          'active',
          0
        ],
      ];
      
      const insertMany = db.transaction((investments: any[][]) => {
        for (const inv of investments) {
          insertStmt.run(inv);
        }
      });
      
      insertMany(sampleInvestments);
      console.log('✅ Invest database initialized with sample data!');
    }
    
    db.close();
    return true;
  } catch (error) {
    console.error('❌ Error initializing invest database:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'active';
    
    if (!fs.existsSync(DB_PATH)) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        message: 'No investments found.'
      });
    }
    
    const db = new Database(DB_PATH);
    let query = 'SELECT * FROM investment_opportunities WHERE 1=1';
    const params: any[] = [];
    
    if (status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }
    
    if (featured === 'true') {
      query += ' AND featured = 1';
    }
    
    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY featured DESC, created_at DESC';
    
    const stmt = db.prepare(query);
    const result = stmt.all(...params);
    db.close();
    
    const parsedData = result.map((r: any) => ({
      ...r,
      features: JSON.parse(r.features || '[]')
    }));
    
    return NextResponse.json({
      success: true,
      data: parsedData,
      total: parsedData.length,
    });
  } catch (error) {
    console.error('❌ GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch investments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    const { 
      title, description, category, icon, min_investment, 
      expected_return, duration, image, features, featured, status
    } = body;
    
    if (!title || !description || !min_investment || !expected_return || !duration) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare(`
      INSERT INTO investment_opportunities (
        title, description, category, icon, min_investment, 
        expected_return, duration, image, features, status, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      title,
      description,
      category || 'Infrastructure',
      icon || 'TrendingUp',
      min_investment,
      expected_return,
      duration,
      image || '/images/invest/default.jpg',
      JSON.stringify(features || []),
      status || 'active',
      featured ? 1 : 0
    );
    
    const getStmt = db.prepare('SELECT * FROM investment_opportunities WHERE id = ?');
    const newInvestment = getStmt.get(info.lastInsertRowid) as any;
    db.close();
    
    return NextResponse.json({
      success: true,
      data: {
        ...newInvestment,
        features: JSON.parse(newInvestment.features || '[]')
      },
      message: 'Investment created successfully',
    });
  } catch (error) {
    console.error('❌ POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create investment' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    console.log('📝 PUT request body:', body);
    
    const { 
      id,
      title, 
      description, 
      category, 
      icon, 
      min_investment, 
      expected_return, 
      duration, 
      image, 
      features, 
      status, 
      featured 
    } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Investment ID required' },
        { status: 400 }
      );
    }
    
    if (!title || !description || !min_investment || !expected_return || !duration) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    
    // Check if investment exists
    const checkStmt = db.prepare('SELECT * FROM investment_opportunities WHERE id = ?');
    const existing = checkStmt.get(parseInt(id));
    
    if (!existing) {
      db.close();
      return NextResponse.json(
        { success: false, error: `Investment with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare(`
      UPDATE investment_opportunities 
      SET title = ?, 
          description = ?, 
          category = ?, 
          icon = ?, 
          min_investment = ?, 
          expected_return = ?, 
          duration = ?, 
          image = ?, 
          features = ?, 
          status = ?, 
          featured = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(
      title,
      description,
      category || 'Infrastructure',
      icon || 'TrendingUp',
      min_investment,
      expected_return,
      duration,
      image || '/images/invest/default.jpg',
      JSON.stringify(features || []),
      status || 'active',
      featured ? 1 : 0,
      parseInt(id)
    );
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to update investment' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Investment updated successfully',
    });
  } catch (error) {
    console.error('❌ PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update investment' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    console.log('🗑️ DELETE request, id:', id);
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Investment ID required' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    
    // Check if investment exists
    const checkStmt = db.prepare('SELECT * FROM investment_opportunities WHERE id = ?');
    const existing = checkStmt.get(parseInt(id));
    
    if (!existing) {
      db.close();
      return NextResponse.json(
        { success: false, error: `Investment with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare('DELETE FROM investment_opportunities WHERE id = ?');
    const result = stmt.run(parseInt(id));
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete investment' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Investment deleted successfully',
    });
  } catch (error) {
    console.error('❌ DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete investment' },
      { status: 500 }
    );
  }
}
