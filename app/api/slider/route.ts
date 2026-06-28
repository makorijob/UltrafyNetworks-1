import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface Env {
  DB: D1Database;
}

function db(req: NextRequest): D1Database {
  return (req as any).cf.env.DB;
}

/* ===========================
   GET ALL SLIDES
=========================== */

export async function GET(req: NextRequest) {
  try {
    const status =
      new URL(req.url).searchParams.get("status") || "active";

    const database = db(req);

    const result = await database
      .prepare(
        `
        SELECT *
        FROM slides
        WHERE status=?
        ORDER BY display_order ASC,id ASC
      `
      )
      .bind(status)
      .all();

    return NextResponse.json({
      success: true,
      data: result.results,
      total: result.results.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

/* ===========================
   CREATE SLIDE
=========================== */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      subtitle,
      description,
      image,
      cta_text,
      cta_link,
      badge,
      display_order,
      status,
    } = body;

    if (!title || !subtitle || !description || !image) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const database = db(req);

    await database
      .prepare(
        `
        INSERT INTO slides
        (
            title,
            subtitle,
            description,
            image,
            cta_text,
            cta_link,
            badge,
            display_order,
            status
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
      )
      .bind(
        title,
        subtitle,
        description,
        image,
        cta_text || "Learn More",
        cta_link || "#",
        badge || "Featured",
        display_order || 0,
        status || "active"
      )
      .run();

    return NextResponse.json({
      success: true,
      message: "Slide created successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

/* ===========================
   UPDATE SLIDE
=========================== */

export async function PUT(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing slide id",
        },
        {
          status: 400,
        }
      );
    }

    const body = await req.json();

    const database = db(req);

    await database
      .prepare(
        `
        UPDATE slides
        SET

        title=?,
        subtitle=?,
        description=?,
        image=?,
        cta_text=?,
        cta_link=?,
        badge=?,
        display_order=?,
        status=?,
        updated_at=CURRENT_TIMESTAMP

        WHERE id=?
      `
      )
      .bind(
        body.title,
        body.subtitle,
        body.description,
        body.image,
        body.cta_text,
        body.cta_link,
        body.badge,
        body.display_order,
        body.status,
        id
      )
      .run();

    return NextResponse.json({
      success: true,
      message: "Slide updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

/* ===========================
   DELETE SLIDE
=========================== */

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing slide id",
        },
        {
          status: 400,
        }
      );
    }

    const database = db(req);

    await database
      .prepare(
        `
        DELETE FROM slides
        WHERE id=?
      `
      )
      .bind(id)
      .run();

    return NextResponse.json({
      success: true,
      message: "Slide deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
