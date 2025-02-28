'use server'

import { cookies } from 'next/headers';
import { supabase } from '../../utils/supabase/client';
import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2'

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const { data, error } = await supabase.from("users")
        .select("id, email, password, isAdmin")
        .eq("email", email)
        .single()


        if (error) {
            console.error(error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: 'email or password is incorrect!' }, { status: 404 });
        } 

        const isPasswordValid = await argon2.verify(data.password, password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'email or password is incorrect' }, { status: 401 });
        }

        const cookieStore = await cookies()
        cookieStore.set('userInfos', JSON.stringify({
            userId: data.id,
            email: data.email,
            isAdmin: data.isAdmin,
        }), { path: '/', maxAge: 3600 }); 

        const redirectUrl = data.isAdmin ? '/admin/dashboard' : '/user';
        return NextResponse.json({ message: 'Logged in successfully', redirect: redirectUrl });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}   