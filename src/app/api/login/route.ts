import connect from "@/connection/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
//@ts-expect-error library warning
import bcryptjs from "bcryptjs";
//@ts-expect-error library warning
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // const salt = await bcryptjs.genSalt(10)
        // const hashedPassword = await bcryptjs.hash("", salt)
        // console.log(process.env.NEXT_PWD,hashedPassword, "++++++++++++")
        // // check if user exists
        // const newUser = new User({ email, password: hashedPassword })

        // const savedUser = await newUser.save()

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exists!" }, { status: 400 })
        }

        // check if password is correct
        const validatePassword = await bcryptjs.compare(password, user.password)
        if (!validatePassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }

        // create token data
        const tokenData = {
            id: user._id,
            email: user.email
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error) {
        //@ts-expect-error warning
        return NextResponse.json({ error: error?.message }, { status: 500 })
    }
}
