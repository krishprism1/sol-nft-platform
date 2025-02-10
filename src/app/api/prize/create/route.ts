import connect from "@/connection/dbConfig";
import Prize from "@/models/prizeModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
//@ts-expect-error library warning
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { randomId, prize } = reqBody;

        const token = request.cookies.get("token")?.value || '';

        if (!token) {
            return NextResponse.json({ msg: "You are not authorized!" }, { status: 400 })
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!)

        const user = await User.findOne({ _id: decodedToken.id })
        if (!user) {
            return NextResponse.json({ msg: "You are not authorized!" }, { status: 400 })
        }
        const _prize = await Prize.findOne({ randomId })
        if (_prize) {
            return NextResponse.json({ msg: "This number is already exist" }, { status: 400 })
        }
        const newPrize = new Prize({ randomId, prize })
        await newPrize.save()

        return NextResponse.json({ msg: "Number added successfully!" }, { status: 200 })
    } catch (error) {
        //@ts-expect-error warning
        return NextResponse.json({ error: error?.message }, { status: 500 })
    }
}
