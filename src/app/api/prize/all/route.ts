import connect from "@/connection/dbConfig";
import Prize from "@/models/prizeModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        const prize = await Prize.find({}, {randomId: 1, prize:1, _id: 0}).lean()
        return NextResponse.json(prize, { status: 200 });
    } catch (error) {
        //@ts-expect-error warning
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
