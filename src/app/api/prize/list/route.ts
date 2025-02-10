import connect from "@/connection/dbConfig";
import Prize from "@/models/prizeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);

        const skip = (page - 1) * limit;

        const prize = await Prize.find().skip(skip).limit(limit);

        const totalCount = await Prize.countDocuments();

        return NextResponse.json({
            data: prize,
            meta: {
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
            },
        }, { status: 200 });
    } catch (error) {
        //@ts-expect-error warning
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
