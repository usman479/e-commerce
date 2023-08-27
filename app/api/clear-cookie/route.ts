import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/lib/drizzle";
import { v4 as uuid } from 'uuid';
import { cookies } from "next/headers";
import { eq, and } from "drizzle-orm";

export const GET = async (request: NextRequest) => {
    const {searchParams} = request.nextUrl;
    const uid = searchParams.get('user_id') as string;
    const setCookies = cookies();
    if(uid === setCookies.get("user_id")?.value){
        setCookies.delete("user_id");
        console.log("cleared")
    }
    return NextResponse.json("success")
    
}