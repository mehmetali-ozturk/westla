import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const formData = await request.json();

    if (!webhookUrl) {
      console.error('Webhook URL is not configured');
      return NextResponse.json(
        { error: 'Webhook URL yapılandırılmamış' },
        { status: 500 }
      );
    }

    console.log('Received form data:', formData); // Debug log

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [{
          title: '👮 Yeni Başvuru',
          color: 0x012B6D,
          fields: [
            { name: '📧 E-posta', value: formData.email || 'Belirtilmemiş' },
            { name: '👤 Ad Soyad', value: formData.oocFullName || 'Belirtilmemiş' },
            { name: '🎂 Yaş', value: formData.oocAge?.toString() || 'Belirtilmemiş' },
            { name: '⏱️ Fivem Saati', value: formData.fivemHours || 'Belirtilmemiş' },
            { name: '🎮 Discord İsmi', value: formData.discordName || 'Belirtilmemiş' },
            { name: '🆔 Discord ID', value: formData.discordId || 'Belirtilmemiş' },
            { name: '🎯 Steam Link', value: formData.steamLink || 'Belirtilmemiş' },
            { name: '📱 Başvuru Kaynağı', value: formData.whereDidYouSee || 'Belirtilmemiş' },
            { name: '👮 Önceki LEO Deneyimi', value: formData.previousLEOExperience || 'Belirtilmemiş' },
            { name: '👥 Referans', value: formData.reference || 'Belirtilmemiş' },
            { name: '\u200B', value: '**---------------IC KISIM---------------**' },
            { name: '📝 Karakter Adı', value: formData.icFullName || 'Belirtilmemiş' },
            { name: '🌍 Uyruk', value: formData.icNationality || 'Belirtilmemiş' },
            { name: '📅 Doğum Tarihi', value: formData.icBirthDate || 'Belirtilmemiş' },
            { name: '⚧ Cinsiyet', value: formData.icGender || 'Belirtilmemiş' },
            { name: '🏥 Sağlık Durumu', value: formData.icHealthIssues || 'Belirtilmemiş' },
            { name: '✅ Discord Durumu', value: formData.discordJoined ? '**Sunucuya Katıldı**' : 'Katılmadı' }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'West LAPD Başvuru Sistemi'
          }
        }]
      })
    });

    if (!response.ok) {
      console.error('Discord API Error:', await response.text());
      throw new Error('Discord webhook hatası');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Form gönderimi başarısız: ' + (error as Error).message },
      { status: 500 }
    );
  }
}