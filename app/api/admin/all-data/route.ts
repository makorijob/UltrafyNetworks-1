import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  image: string;
  category: string;
  features: string;
  status: string;
  created_at: string;
}

interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  icon: string;
  desc: string;
  status: string;
  posted_date: string;
}

interface Review {
  id: number;
  name: string;
  area: string;
  quote: string;
  rating: number;
  status: string;
  created_at: string;
}

function getDb(dbPath: string): Database.Database | null {
  if (!fs.existsSync(dbPath)) {
    return null;
  }
  return new Database(dbPath);
}

export async function GET() {
  try {
    // Fetch all data from different databases
    const servicesDb = getDb('/tmp/services.db');
    const careersDb = getDb('/tmp/careers.db');
    const testimonialsDb = getDb('/tmp/testimonials.db');

    let services: Service[] = [];
    let careers: Career[] = [];
    let reviews: Review[] = [];

    if (servicesDb) {
      services = servicesDb.prepare('SELECT * FROM services ORDER BY created_at DESC').all() as Service[];
      servicesDb.close();
    }

    if (careersDb) {
      careers = careersDb.prepare('SELECT * FROM roles ORDER BY posted_date DESC').all() as Career[];
      careersDb.close();
    }

    if (testimonialsDb) {
      reviews = testimonialsDb.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all() as Review[];
      testimonialsDb.close();
    }

    return NextResponse.json({
      success: true,
      data: {
        services,
        careers,
        reviews,
      },
      totals: {
        services: services.length,
        careers: careers.length,
        reviews: reviews.length,
        pendingReviews: reviews.filter(r => r.status === 'pending').length,
        openJobs: careers.filter(c => c.status === 'open').length,
      }
    });
  } catch (error) {
    console.error('Error fetching all data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
