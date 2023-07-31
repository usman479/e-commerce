import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/lib/drizzle";
import {v4 as uuid} from 'uuid';
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export const GET = async (request: NextRequest) => {
    const {searchParams} = request.nextUrl;
    const uid = searchParams.get('user_id') as string;
    try {
        const res = await db.select().from(cartTable).where(eq(cartTable.user_id,uid));
        return NextResponse.json({ res });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'someting went wrong' });
    }
}

export const POST = async (request: Request) => {
    const req = await request.json();
    const uid = uuid();
    const setCookies = cookies();
    if(!setCookies.get('user_id')){
        setCookies.set('user_id',uid);
    }
    try {
        const res = await db.insert(cartTable).values({
            product_id: req.product_id,
            quantity: 1,
            user_id: setCookies.get('user_id')?.value as string
        }).returning();
        return NextResponse.json({ res });
    } catch (error) {

    }
}