import { cookies } from 'next/headers'
import { supabase } from '../../../utils/supabase/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get('userInfos')

    if (!userCookie) {
        return NextResponse.json({ error: 'User not authenticated!'}, { status: 401})
    }

    const email = JSON.parse(userCookie.value).email

    const { data, error } = await supabase
        .from("emails")
        .select("id, subject, body, sender, created_at, isRead")
        .eq("receiver", email)
        .limit(100)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
        return NextResponse.json({ error: "No emails found for this user." }, { status: 404 })
    }

    return NextResponse.json({
        emails: data.map((email) => ({
            id: email.id,
            subject: email.subject,
            body: email.body,
            sender: email.sender,
            created_at: email.created_at,
            isRead: email.isRead
        }))
    })
}

export async function POST(req: NextRequest) {
    const { receiver, subject, body } = await req.json()
    const cookieStore = await cookies()
    const userCookie = cookieStore.get('userInfos')

    if (!userCookie) {
        return NextResponse.json({ error: 'User not authenticated!'}, { status: 401})
    }

    const sender = JSON.parse(userCookie.value).email
    
    const { error } = await supabase
    .from("emails")
    .insert({
        receiver,
        subject,
        body,
        sender,
        isRead: false
    })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Email sent successfully." })
}