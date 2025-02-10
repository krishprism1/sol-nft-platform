import connect from "@/connection/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function POST() {
    try {
        return NextResponse.json({ msg: "delete" }, { status: 200 })
    } catch (error) {
        //@ts-expect-error warning
        return NextResponse.json({ error: error?.message }, { status: 500 })
    }
}
