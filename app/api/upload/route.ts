import { createClient } from '@supabase/supabase-js';

import { NextRequest, NextResponse } from 'next/server';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key');
}
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "Dosya yüklenmedi!" }, { status: 400 });
        }

        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage.from('photos').upload(fileName, file);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: "Fotoğraf yüklenemedi!" }, { status: 500 });
        }

        const photoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${fileName}`;

        const { error: dbError } = await supabase
            .from('photos')
            .insert([{ url: photoUrl, approved: false, starred: false }]);

        if (dbError) {
            return NextResponse.json({ error: dbError.message }, { status: 500 });
        }

        return NextResponse.json({ url: photoUrl }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Sunucu hatası! " + error }, { status: 500 });
    }
}
