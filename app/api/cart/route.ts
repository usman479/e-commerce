import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/lib/drizzle";
import { v4 as uuid } from 'uuid';
import { cookies } from "next/headers";
import { eq, and, sql } from "drizzle-orm";

export const GET = async (request: NextRequest) => {
    // const {searchParams} = request.nextUrl;
    // const uid = searchParams.get('user_id') as string;
    const setCookies = cookies();
    const uid = setCookies.get('user_id')?.value as string;
    try {
        const res = await db.select().from(cartTable).where(eq(cartTable.user_id, uid)).orderBy(cartTable.id);
        return NextResponse.json(res);
    } catch (error) {
        // console.log(error);
        return NextResponse.json({ message: 'someting went wrong' });
    }
}

export const POST = async (request: Request) => {
    const req = await request.json();

    const setCookies = cookies();
    let user_id = setCookies.get('user_id')?.value as string;
    console.log('this user_id', user_id);
    if (!setCookies.get('user_id')) {
        const uid = uuid();
        setCookies.set('user_id', uid);
        user_id = uid;
    }

    try {
        const res = await db.insert(cartTable).values({
            product_id: req.product_id,
            quantity: req.quantity,
            user_id: user_id
        }).onConflictDoUpdate({
            target: [cartTable.product_id, cartTable.user_id],
            set: { quantity: sql`${cartTable.quantity} + ${req.quantity}` }
        }).returning();
        return NextResponse.json(res[0]);
    } catch (error) {
        // console.log(error.message)
        return NextResponse.json({ message: "failed" });
    }
}

export const PATCH = async (request: Request) => {
    const req = await request.json();
    const user_id = cookies().get('user_id')?.value as string;
    try {
        const update = await db.update(cartTable)
            .set({ quantity: req.quantity })
            .where(and(eq(cartTable.user_id, user_id), eq(cartTable.product_id, req.product_id)));
        const res = await db.select().from(cartTable).where(eq(cartTable.user_id, user_id)).orderBy(cartTable.id);

        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ message: "failed" });
    }
}

export const DELETE = async (request: NextRequest) => {
    const { searchParams } = request.nextUrl;
    const id = Number(searchParams.get('id')) as number;
    try {
        const res = await db.delete(cartTable).where(eq(cartTable.id, id)).returning();
        return NextResponse.json(res[0])
    } catch (err) {
        return NextResponse.json({ message: "failed" });
    }
}