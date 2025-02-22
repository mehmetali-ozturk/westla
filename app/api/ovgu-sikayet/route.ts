import { NextResponse } from 'next/server';

type RideAlongFormData = {
  icName: string;
  phoneNumber: string;
  adress: string;
  convenientTime: string;
  casePlace: string;
  caseWitnesses: string;
  casePolice: string;
  caseAbout: string;
};

export async function POST(request: Request) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL_PRAISE_COMPLAINT;
    const formData: RideAlongFormData = await request.json();
    
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
    if (!formData || !formData.icName || !formData.phoneNumber || !formData.adress || !formData.convenientTime || !formData.casePlace || !formData.caseWitnesses || !formData.casePolice || !formData.caseAbout) {
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
        content: "🚨 **Yeni Övgü - Şikayet Formu Alındı!** 🚨 ||@everyone||",
        embeds: [{
          title: '👮 Övgü - Şikayet Formu Detayları',
          color: 0x012B6D,
          fields: [
            { name: '📧 İsim', value: formData.icName },
            { name: '📞 Telefon Numarası', value: formData.phoneNumber },
            { name: '🏠 Adres', value: formData.adress },
            { name: '🕒 Uygun Zaman', value: formData.convenientTime },
            { name: '📍 Olayın Gerçekleştiği yer', value: formData.casePlace },
            { name: '👮 Olaya karışan memur', value: formData.casePolice },
            { name: '👥 Şahitler', value: formData.caseWitnesses },
            { name: '📝 Olay Hakkında', value: formData.caseAbout },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'West LA Sivil Övgü ve Şikayet Sistemi'
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