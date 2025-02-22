import { NextResponse } from 'next/server';

type FormDataType = {
  email: string;
  oocFullName: string;
  oocAge: string;
  fivemHours: string;
  discordName: string;
  discordId: string;
  steamLink: string;
  whereDidYouSee: string;
  previousLEOExperience: string;
  reference: string;
  icFullName: string;
  icNationality: string;
  icBirthDate: string;
  icGender: string;
  icHealthIssues: string;
  discordJoined: boolean;
};

export async function POST(request: Request) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const formData: FormDataType = await request.json();
    
    // Debug logs
    console.log('Received form data:', formData);
    console.log('Webhook URL configured:', !!webhookUrl);

    if (!webhookUrl) {
      console.error('Webhook URL yapılandırılmamış');
      return NextResponse.json(
        { error: 'Sistem yapılandırma hatası' },
        { status: 500 }
      );
    }

    // Validate form data
    if (!formData || !formData.email || !formData.oocFullName) {
      console.error('Missing required fields:', formData);
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: "🚨 **Yeni LAPD Başvurusu Alındı!** 🚨 ||@everyone||",
        embeds: [{
          title: '👮 Başvuru Detayları',
          color: 0x012B6D,
          fields: [
            { name: '📧 E-posta', value: formData.email},
            { name: '👤 Ad Soyad', value: formData.oocFullName},
            { name: '🎂 Yaş', value: formData.oocAge},
            { name: '⏱️ Fivem Saati', value: formData.fivemHours},
            { name: '🎮 Discord İsmi', value: formData.discordName},
            { name: '🆔 Discord ID', value: formData.discordId},
            { name: '🎯 Steam Link', value: formData.steamLink },
            { name: '📱 Başvuru Kaynağı', value: formData.whereDidYouSee },
            { name: '👮 Önceki LEO Deneyimi', value: formData.previousLEOExperience },
            { name: '👥 Referans', value: formData.reference },
            { name: '\u200B', value: '**---------------IC KISIM---------------**' },
            { name: '📝 Karakter Adı', value: formData.icFullName},
            { name: '🌍 Uyruk', value: formData.icNationality},
            { name: '📅 Doğum Tarihi', value: formData.icBirthDate},
            { name: '⚧ Cinsiyet', value: formData.icGender},
            { name: '🏥 Sağlık Durumu', value: formData.icHealthIssues },
            { name: '✅ Discord Durumu', value: formData.discordJoined ? '**Sunucuya Katıldı**' : '**Henüz Katılmadı**' }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'West LAPD Başvuru Sistemi'
          }
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord API Hatası:', errorText);
      throw new Error('Webhook gönderimi başarısız');
    }

    return NextResponse.json({
      success: true,
      message: 'Başvurunuz başarıyla alındı'
    });

  } catch (error) {
    console.error('API Route Hatası:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Başvuru gönderilirken bir hata oluştu',
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}