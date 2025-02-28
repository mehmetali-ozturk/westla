import { NextRequest, NextResponse } from 'next/server';

type RideAlongFormData = {
  icName: string;
  DOB: string;
  phoneNumber: string;
  adress: string;
  rideAlongDate: string;
  rideAlongTime: string;
  TOC: boolean;
  TOC2: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL_RIDE_ALONG;
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
    if (!formData || !formData.icName || !formData.DOB || !formData.phoneNumber || !formData.adress || !formData.rideAlongDate) {
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
        content: "🚨 **Yeni Ride Along Başvurusu Alındı!** 🚨 ||@everyone||",
        embeds: [{
          title: '👮 Ride Along Başvuru Detayları',
          color: 0x012B6D,
          fields: [
            { name: '📧 İsim', value: formData.icName },
            { name: '🎂 Doğum Tarihi', value: formData.DOB },
            { name: '📞 Telefon Numarası', value: formData.phoneNumber },
            { name: '🏠 Adres', value: formData.adress },
            { name: '📅 Ride Along Tarihi', value: formData.rideAlongDate },
            { name: '🕒 Ride Along Saati', value: formData.rideAlongTime },
            { name: '✅ Sorumluluk Reddi', value: formData.TOC ? 'Evet' : 'Hayır' },
            { name: '✅ Sorumluluk Reddi 2', value: formData.TOC2 ? 'Evet' : 'Hayır' }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'West LAPD Ride Along Başvuru Sistemi'
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