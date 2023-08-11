import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/lib/drizzle";
import {v4 as uuid} from 'uuid';
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export const GET = async (request: NextRequest) => {
    
        return NextResponse.json({ message: 'Successfull!' });
    
}