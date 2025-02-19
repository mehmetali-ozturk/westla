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
            fields: [
              { name: '📧 E-posta', value: formData.email, inline: true },
              { name: '👤 Ad Soyad', value: formData.oocFullName, inline: true },
              { name: '🎂 Yaş', value: formData.oocAge.toString(), inline: true },
              { name: '⏱️ Fivem Saati', value: formData.fivemHours, inline: true },
              { name: '🎮 Discord İsmi', value: formData.discordName, inline: true },
              { name: '🆔 Discord ID', value: formData.discordId, inline: true },
              { name: '🎯 Steam Link', value: formData.steamLink },
              { name: '📱 Başvuru Kaynağı', value: formData.whereDidYouSee },
              { name: '👮 Önceki LEO Deneyimi', value: formData.previousLEOExperience },
              { name: '👥 Referans', value: formData.reference },
              { name: '\u200B', value: '**---------------IC KISIM---------------**' },
              { name: '📝 Karakter Adı', value: formData.icFullName, inline: true },
              { name: '🌍 Uyruk', value: formData.icNationality, inline: true },
              { name: '📅 Doğum Tarihi', value: formData.icBirthDate, inline: true },
              { name: '⚧ Cinsiyet', value: formData.icGender, inline: true },
              { name: '🏥 Sağlık Durumu', value: formData.icHealthIssues },
              { name: '✅ Discord Durumu', value: formData.discordJoined ? '**Sunucuya Katıldı**' : 'Katılmadı', inline: true }
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'West LAPD Başvuru Sistemi'
            }
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