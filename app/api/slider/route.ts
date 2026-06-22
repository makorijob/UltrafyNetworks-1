import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';

const DB_PATH = path.join(process.cwd(), 'slider.db');
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/slider');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log('✅ Created upload directory:', UPLOAD_DIR);
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta_text: string;
  cta_link: string;
  badge: string;
  display_order: number;
  status: string;
  created_at: string;
  updated_at: string;
}

function initializeDatabase() {
  try {
    const dbExists = fs.existsSync(DB_PATH);
    const db = new Database(DB_PATH);
    
    if (!dbExists) {
      db.exec(`
        CREATE TABLE IF NOT EXISTS slides (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          subtitle TEXT NOT NULL,
          description TEXT NOT NULL,
          image TEXT NOT NULL,
          cta_text TEXT DEFAULT 'Learn More',
          cta_link TEXT DEFAULT '#',
          badge TEXT DEFAULT 'Featured',
          status TEXT DEFAULT 'active',
          display_order INTEGER DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      const insertStmt = db.prepare(`
        INSERT INTO slides (
          title, subtitle, description, image, cta_text, cta_link, badge, display_order, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const sampleSlides = [
        [
          'UltrafyNetworks',
          'Tuko Thika',
          'Premium fibre internet built for Thika homes and businesses.',
          '/uploads/slider/slide1.jpg',
          'Get Connected Now',
          '#contact',
          'Now live in Thika',
          1,
          'active'
        ],
        [
          'Fibre to the Home',
          'Lightning Fast Speeds',
          'Experience the power of true fibre internet with speeds up to 30 Mbps.',
          '/uploads/slider/slide2.jpg',
          'View Packages',
          '#packages',
          'Fibre Internet',
          2,
          'active'
        ],
        [
          '1 Month Free',
          'Special Offer',
          'Sign up today and get your first month absolutely free!',
          '/uploads/slider/slide3.jpg',
          'Claim Offer',
          '#contact',
          'Special Offer',
          3,
          'active'
        ],
        [
          'UltrafyNetworks',
          'Connecting Thika',
          'Join hundreds of satisfied customers across Thika.',
          '/uploads/slider/slide4.jpg',
          'Learn More',
          '/services',
          'Trusted Provider',
          4,
          'active'
        ],
      ];
      
      const insertMany = db.transaction((slides: any[][]) => {
        for (const slide of slides) {
          insertStmt.run(slide);
        }
      });
      
      insertMany(sampleSlides);
      console.log('✅ Slider database initialized!');
    }
    db.close();
    return true;
  } catch (error) {
    console.error('❌ Error initializing slider database:', error);
    return false;
  }
}

// Helper function to save uploaded file
async function saveFile(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.name);
    const filename = `${timestamp}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    
    await writeFile(filepath, buffer);
    console.log('✅ File saved:', filepath);
    return `/uploads/slider/${filename}`;
  } catch (error) {
    console.error('❌ Error saving file:', error);
    throw error;
  }
}

// GET: Fetch all slides
export async function GET(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';
    
    if (!fs.existsSync(DB_PATH)) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
      });
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare(
      'SELECT * FROM slides WHERE status = ? ORDER BY display_order ASC, created_at DESC'
    );
    const result = stmt.all(status);
    db.close();
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('❌ Error fetching slides:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch slides' },
      { status: 500 }
    );
  }
}

// POST: Create a new slide with image upload
export async function POST(request: NextRequest) {
  try {
    console.log('📝 POST request received for slide creation');
    initializeDatabase();
    
    // Check content type
    const contentType = request.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);
    
    if (!contentType.includes('multipart/form-data')) {
      console.error('❌ Invalid content type:', contentType);
      return NextResponse.json(
        { success: false, error: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      );
    }
    
    const formData = await request.formData();
    console.log('📋 FormData received');
    
    // Log all form data entries for debugging
    for (const [key, value] of formData.entries()) {
      if (key === 'image') {
        const file = value as File;
        console.log(`📎 Image: ${file.name}, Size: ${file.size} bytes, Type: ${file.type}`);
      } else {
        console.log(`📝 ${key}: ${value}`);
      }
    }
    
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const description = formData.get('description') as string;
    const cta_text = formData.get('cta_text') as string || 'Learn More';
    const cta_link = formData.get('cta_link') as string || '#';
    const badge = formData.get('badge') as string || 'Featured';
    const display_order = parseInt(formData.get('display_order') as string) || 0;
    const status = formData.get('status') as string || 'active';
    const imageFile = formData.get('image') as File | null;
    
    // Validate required fields
    if (!title || !subtitle || !description) {
      console.error('❌ Missing required fields:', { title, subtitle, description });
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, subtitle, description' },
        { status: 400 }
      );
    }
    
    // Validate image
    if (!imageFile || imageFile.size === 0) {
      console.error('❌ No image file provided');
      return NextResponse.json(
        { success: false, error: 'Please select an image to upload' },
        { status: 400 }
      );
    }
    
    // Validate image type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(imageFile.type)) {
      console.error('❌ Invalid image type:', imageFile.type);
      return NextResponse.json(
        { success: false, error: 'Invalid image format. Please use JPEG, PNG, or WebP' },
        { status: 400 }
      );
    }
    
    // Validate image size (5MB max)
    if (imageFile.size > 5 * 1024 * 1024) {
      console.error('❌ Image too large:', imageFile.size);
      return NextResponse.json(
        { success: false, error: 'Image size too large. Maximum 5MB allowed' },
        { status: 400 }
      );
    }
    
    // Save image
    let imagePath = await saveFile(imageFile);
    console.log('✅ Image saved:', imagePath);
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare(`
      INSERT INTO slides (
        title, subtitle, description, image, cta_text, cta_link, badge, display_order, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      title,
      subtitle,
      description,
      imagePath,
      cta_text,
      cta_link,
      badge,
      display_order,
      status
    );
    
    const getStmt = db.prepare('SELECT * FROM slides WHERE id = ?');
    const newSlide = getStmt.get(info.lastInsertRowid);
    db.close();
    
    console.log('✅ Slide created successfully with ID:', info.lastInsertRowid);
    
    return NextResponse.json({
      success: true,
      data: newSlide,
      message: 'Slide created successfully',
    });
  } catch (error) {
    console.error('❌ Error creating slide:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to create slide' },
      { status: 500 }
    );
  }
}

// PUT: Update a slide with optional image upload
export async function PUT(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Slide ID required' },
        { status: 400 }
      );
    }
    
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      );
    }
    
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const description = formData.get('description') as string;
    const cta_text = formData.get('cta_text') as string;
    const cta_link = formData.get('cta_link') as string;
    const badge = formData.get('badge') as string;
    const display_order = parseInt(formData.get('display_order') as string) || 0;
    const status = formData.get('status') as string;
    const imageFile = formData.get('image') as File | null;
    
    const db = new Database(DB_PATH);
    
    // Get existing slide
    const getStmt = db.prepare('SELECT * FROM slides WHERE id = ?');
    const existingSlide = getStmt.get(parseInt(id)) as Slide | undefined;
    
    if (!existingSlide) {
      db.close();
      return NextResponse.json(
        { success: false, error: 'Slide not found' },
        { status: 404 }
      );
    }
    
    let imagePath = existingSlide.image;
    if (imageFile && imageFile.size > 0) {
      // Validate image type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(imageFile.type)) {
        db.close();
        return NextResponse.json(
          { success: false, error: 'Invalid image format. Please use JPEG, PNG, or WebP' },
          { status: 400 }
        );
      }
      
      // Validate image size (5MB max)
      if (imageFile.size > 5 * 1024 * 1024) {
        db.close();
        return NextResponse.json(
          { success: false, error: 'Image size too large. Maximum 5MB allowed' },
          { status: 400 }
        );
      }
      
      // Delete old image if it exists and is not a default
      if (imagePath && !imagePath.includes('slide1.jpg') && !imagePath.includes('slide2.jpg') && 
          !imagePath.includes('slide3.jpg') && !imagePath.includes('slide4.jpg')) {
        const oldPath = path.join(process.cwd(), 'public', imagePath);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      imagePath = await saveFile(imageFile);
    }
    
    const stmt = db.prepare(`
      UPDATE slides 
      SET title = ?, subtitle = ?, description = ?, image = ?, 
          cta_text = ?, cta_link = ?, badge = ?, display_order = ?, status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = stmt.run(
      title || existingSlide.title,
      subtitle || existingSlide.subtitle,
      description || existingSlide.description,
      imagePath,
      cta_text || existingSlide.cta_text,
      cta_link || existingSlide.cta_link,
      badge || existingSlide.badge,
      display_order || existingSlide.display_order,
      status || existingSlide.status,
      parseInt(id)
    );
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Slide not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Slide updated successfully',
    });
  } catch (error) {
    console.error('❌ Error updating slide:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to update slide' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a slide and its image
export async function DELETE(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Slide ID required' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    
    // Get slide to delete image
    const getStmt = db.prepare('SELECT * FROM slides WHERE id = ?');
    const slide = getStmt.get(parseInt(id)) as Slide | undefined;
    
    if (slide) {
      // Delete image file if it exists and is not a default
      const imagePath = slide.image;
      if (imagePath && !imagePath.includes('slide1.jpg') && !imagePath.includes('slide2.jpg') && 
          !imagePath.includes('slide3.jpg') && !imagePath.includes('slide4.jpg')) {
        const fullPath = path.join(process.cwd(), 'public', imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    }
    
    const stmt = db.prepare('DELETE FROM slides WHERE id = ?');
    const result = stmt.run(parseInt(id));
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Slide not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Slide deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting slide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete slide' },
      { status: 500 }
    );
  }
}
