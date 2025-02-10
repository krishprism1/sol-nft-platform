import { NextRequest, NextResponse } from "next/server";
//@ts-expect-error library warning
import jwt from "jsonwebtoken"

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        if(!token){
            return NextResponse.json({ error: "You are not authorized!" }, { status: 400 })
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id;
    } catch (error) {
        console.log(error)
        //@ts-expect-error warning
        throw new Error(error?.message)
    }
}