'use server'

import { supabase } from '@/app/utils/supabase/client'
import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';

export async function GET() {
  try {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      console.error('Error fetching personnel:', error);
      return NextResponse.json(
        { error: (error as Error).message || 'Internal Server Error' }, 
        { status: 500 }
      );
    }

    const rankOrder: Record<string, number> = {
      'Lieutenant I': 1,
      'Sergeant II': 2,
      'Detective II': 3,
      'Sergeant I': 4,
      'Senior Lead Officer': 5,
      'Detective I': 6,
      'Officer III': 7,
      'Officer II': 8,
    };

    const sortedData = [...data].sort((a, b) => {
      const rankA = rankOrder[a.rank as keyof typeof rankOrder] || 999;
      const rankB = rankOrder[b.rank as keyof typeof rankOrder] || 999;
      return rankA - rankB;
    });

    return NextResponse.json(sortedData);
  } catch (error) {
    console.error('Error fetching personnel:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
  
}

function generatePassword(): string {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialCharacters = '!@#$%^&*()_+~`|}{[]:;?><';

  const passwordLength = 12;
  const password = Array.from({ length: passwordLength }, () => {
    const randomNumber = Math.floor(Math.random() * 4);
    switch (randomNumber) {
      case 0:
        return uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
      case 1:
        return lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
      case 2:
        return numbers[Math.floor(Math.random() * numbers.length)];
      case 3:
        return specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
    }
  }).join('');

  return password;
}

export async function POST(request: NextRequest) {
  try {
    const { fullname, rank, bureau, profilePhoto } = await request.json();

    const [firstName, lastName] = fullname.split(' ');
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL_LOGIN_INFO;

    const email = lastName.toLowerCase() + '.' + firstName.toLowerCase() + '@westla.com';
    const username = lastName.toLowerCase() + '.' + firstName.toLowerCase();
    const password = generatePassword();
    const hashedPassword = await argon2.hash(password);

    if (!webhookUrl) {
      console.error('Webhook URL yapılandırılmamış');
      return NextResponse.json(
        { error: 'Sistem yapılandırma hatası' },
        { status: 500 }
      );
    }

    const { error } = await supabase
     .from('users')
     .insert([{ email, password: hashedPassword, username, fullname, rank, bureau, profile_photo: profilePhoto }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: "🚨 **Yeni kullanıcı girişi yapıldı!**",
        embeds: [{
          title: '👮 Kullanıcı Bilgileri',
          color: 0x012B6D,
          fields: [
            { name: '📧 Email', value: email },
            { name: '🔑 Şifre', value: password },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'West LA Kullanıcı Bilgileri'
          }
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord API Hatası:', errorText);
      throw new Error('Webhook gönderimi başarısız');
    }

    return NextResponse.json({ message: 'Kullanıcı oluşturuldu. Personelin yeni şifresi: ' + password }, { status: 201 });
  } catch (error) {
    console.error('Webhook Hatası:', error);
    return NextResponse.json({ error: 'Webhook ile iletişim kurulamadı' }, { status: 500 });
  }
}
