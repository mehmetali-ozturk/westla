import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.json();
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'Webhook URL yapılandırılmamış' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [{
          title: 'Yeni Başvuru',
          color: 0x012B6D,
          fields: formData.fields,
          timestamp: new Date().toISOString()
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Discord webhook hatası');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Form gönderimi başarısız' },
      { status: 500 }
    );
  }
}