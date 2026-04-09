// Email Service (Resend)
// Replace with actual Resend API calls in production

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface SongDeliveryEmailData {
  recipientName: string;
  recipientEmail: string;
  occasion: string;
  audioUrl: string;
  pdfUrl: string;
  videoUrl?: string;
  lyrics: string;
  duration: number;
  shareUrl?: string;
}

export interface PurchaseConfirmationEmailData {
  orderId: string;
  recipientName: string;
  occasion: string;
  packageType: string;
  price: number;
  estimatedTime: number; // minutes
}

export interface GiftEmailData {
  senderName: string;
  recipientName: string;
  recipientEmail: string;
  message: string;
  audioUrl: string;
  pdfUrl: string;
  lyrics: string;
}

// Send song delivery email when song is ready
export async function sendSongDeliveryEmail(data: SongDeliveryEmailData): Promise<boolean> {
  try {
    const { recipientName, recipientEmail, occasion, audioUrl, pdfUrl, videoUrl, lyrics, duration } = data;
    
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tvoja pesma je spremna! 🎵</title>
  <style>
    body { font-family: Arial, sans-serif; background: #fef2f2; padding: 20px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
    h1 { color: #e11d48; margin-top: 0; }
    .song-info { background: #fff1f2; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .audio-player { margin: 20px 0; }
    .download-btn { display: inline-block; background: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 5px; font-weight: bold; }
    .download-btn:hover { background: #be123c; }
    .lyrics { background: #f5f5f5; padding: 15px; border-left: 4px solid #e11d48; white-space: pre-wrap; border-radius: 4px; margin: 20px 0; }
    .share-links { margin: 30px 0; }
    .share-links a { text-decoration: none; display: inline-block; margin: 5px; }
    .note { font-size: 13px; color: #666; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎵 Tvoja pesma je spremna!</h1>
    
    <p>Pesma za <strong>${recipientName}</strong> je kreirana i spremljena za download.</p>
    
    <div class="song-info">
      <strong>Pesma za:</strong> ${recipientName}<br>
      <strong>Prilika:</strong> ${occasion.charAt(0).toUpperCase() + occasion.slice(1)}<br>
      <strong>Trajanje:</strong> ${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}
    </div>
    
    <h2>🎧 Slušaj_odmah:</h2>
    <div class="audio-player">
      <audio controls style="width: 100%;" preload="metadata">
        <source src="${audioUrl}" type="audio/mpeg">
      </audio>
    </div>
    
    <h2>📥 PREUZMI:</h2>
    <div>
      <a href="${audioUrl}" class="download-btn">🎵 MP3 Audio</a>
      <a href="${pdfUrl}" class="download-btn">📄 Tekst (PDF)</a>
      ${videoUrl ? `<a href="${videoUrl}" class="download-btn">🎬 Video sa lirikom</a>` : ''}
    </div>
    
    <h3>📝 Tekst pesme:</h3>
    <div class="lyrics">${lyrics}</div>
    
    <div class="share-links">
      <h3>📤 Podeli pesmu:</h3>
      <p>Podeli sa dragim ljudima ili na društvenim mrežama!</p>
    </div>
    
    <p class="note">
      <strong>Fajlovi su dostupni 30 dana.</strong><br>
      Preuzmi ih i sačuvaj kao uspomenu koja traje zauvek! ❤️
    </p>
    
    <hr>
    <p>
      <a href="#">Napravi novu pesmu</a> | 
      <a href="#">Slušaj primere</a>
    </p>
  </div>
</body>
</html>
    `;

    // TODO: Replace with actual Resend API call
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'Pesma Za Tebe <pesme@pesmazgatebe.com>',
    //     to: recipientEmail,
    //     subject: `Tvoja pesma je spremna - ${recipientName} 🎵`,
    //     html,
    //   }),
    // });
    
    console.log('[Email] Song delivery email sent to:', recipientEmail);
    console.log('[Email] Content preview:', html.substring(0, 200) + '...');
    
    return true;
  } catch (error) {
    console.error('[Email] Failed to send song delivery email:', error);
    return false;
  }
}

// Send purchase confirmation email after payment
export async function sendPurchaseConfirmationEmail(data: PurchaseConfirmationEmailData): Promise<boolean> {
  try {
    const { orderId, recipientName, occasion, packageType, price, estimatedTime } = data;
    
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Potvrda kupovine</title>
  <style>
    body { font-family: Arial, sans-serif; background: #fef2f2; padding: 20px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; radiu: 10px; }
    h1 { color: #e11d48; margin-top: 0; }
    .order-details { background: #fff1f2; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .bill { font-size: 24px; margin: 10px 0; }
    .status { background: #dcfce7; color: #166534; padding: 10px; border-radius: 5px; display: inline-block; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>✅ Kupovina uspešna!</h1>
    
    <p style="font-size: 18px;">Hvala na kupovini! Tvoja pesma se već kreira.</p>
    
    <div class="order-details">
      <p><strong>Broj porudžbine:</strong> ${orderId}</p>
      <p><strong>Pesma za:</strong> ${recipientName}</p>
      <p><strong>Prilika:</strong> ${occasion.charAt(0).toUpperCase() + occasion.slice(1)}</p>
      <p><strong>Paket:</strong> ${packageType.toUpperCase()}</p>
      <p class="bill"><strong>Iznos:</strong> €${price.toFixed(2)}</p>
    </div>
    
    <div class="status">
      🎵 <strong>Status:</strong> Pesma se generiše...
    </div>
    
    <p>
      <strong>Očekivano vreme:</strong> ${estimatedTime} minute<br>
      Poslaćemo ti email kada pesma bude spremna.
    </p>
    
    <hr>
    <p>
      <a href="#">Prati status kupovine</a> | 
      <a href="#">Kontakt za podršku</a>
    </p>
  </div>
</body>
</html>
    `;

    // TODO: Replace with actual Resend API call
    console.log('[Email] Purchase confirmation email sent');
    console.log('[Email] Order:', orderId);
    console.log('[Email] Content preview:', html.substring(0, 200) + '...');
    
    return true;
  } catch (error) {
    console.error('[Email] Failed to send purchase confirmation:', error);
    return false;
  }
}

// Send gift email
export async function sendGiftEmail(data: GiftEmailData): Promise<boolean> {
  try {
    const { senderName, recipientName, recipientEmail, message, audioUrl, pdfUrl, lyrics } = data;
    
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dobila si pesmu kao poklon! 🎁</title>
  <style>
    body { font-family: Arial, sans-serif; background: #fef2f2; padding: 20px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
    h1 { color: #e11d48; margin-top: 0; }
    .gift-message { background: linear-gradient(135deg, #ffe4e6 0%, #fef3c7 100%); padding: 20px; border-radius: 8px; margin: 20px 0; font-style: italic; }
    .sender { color: #666; font-size: 14px; margin-top: 10px; }
    .download-btn { display: inline-block; background: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 5px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎁 Dobila si pesmu kao poklon!</h1>
    
    <p>Zdravo <strong>${recipientName}</strong>! Neko ti je poslao personalizovanu pesmu.</p>
    
    <div class="gift-message">
      "${message}"
      <div class="sender">— ${senderName}</div>
    </div>
    
    <h2>📥 Preuzmi svoju pesmu:</h2>
    <div>
      <a href="${audioUrl}" class="download-btn">🎵 MP3 Audio</a>
      <a href="${pdfUrl}" class="download-btn">📄 Tekst</a>
    </div>
    
    <h3>📝 Tekst pesme:</h3>
    <div style="background: #f5f5f5; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${lyrics}</div>
    
    <hr>
    <p><strong>Želiš da napraviš pesmu za nekoga drugoga?</strong> 👇</p>
    <a href="#" class="download-btn">Napravi pesmu</a>
  </div>
</body>
</html>
    `;

    // TODO: Replace with actual Resend API call
    console.log('[Email] Gift email sent to:', recipientEmail);
    console.log('[Email] From:', senderName);
    console.log('[Email] Content preview:', html.substring(0, 200) + '...');
    
    return true;
  } catch (error) {
    console.error('[Email] Failed to send gift email:', error);
    return false;
  }
}

// Generic email sending function
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // TODO: Replace with actual Resend API call
    console.log('[Email] Generic email sent:', options.subject);
    
    return true;
  } catch (error) {
    console.error('[Email] Failed to send email:', error);
    return false;
  }
}