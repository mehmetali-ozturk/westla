import { cookies } from 'next/headers'
import { supabase } from '../../utils/supabase/client'
import { NextResponse } from 'next/server'

export async function GET() {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get('userInfos')

    if (!userCookie) {
        return NextResponse.json({ error: 'User not authenticated!'}, { status: 401})
    }

    const userId = JSON.parse(userCookie.value).userId
    const userEmail = JSON.parse(userCookie.value).email

    const { data, error } = await supabase.from("users").select("fullname, rank, bureau, badge, profile_photo").eq("id", userId).single()
    if (error) {
        console.error(error)
        return NextResponse.json({ error: 'An error occurred while fetching user informations'}, { status: 500 })
    }

    return NextResponse.json({
        fullname:  data.fullname,
        rank:  data.rank,
        bureau:  data.bureau,
        badge:  data.badge,
        profile_photo:  data.profile_photo,
        email: userEmail
    })
}