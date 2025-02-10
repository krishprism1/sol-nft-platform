import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/connection/dbConfig";
//@ts-expect-error library warning
import jwt from "jsonwebtoken"
connect()

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || '';

        if (!token) {
            return NextResponse.json({ msg: "You are not authorized!" }, { status: 400 })
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!)

        const user = await User.findOne({ _id: decodedToken.id })
        if (!user) {
            return NextResponse.json({ msg: "You are not authorized!" }, { status: 400 })
        }

        return NextResponse.json({success: true })
    } catch (error) {
        //@ts-expect-error expected warning
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}