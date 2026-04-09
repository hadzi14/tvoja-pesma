// PDF Generator for song lyrics using browser's Canvas API
// In production, this would use a backend service like PDFKit

export interface PDFData {
  recipientName: string;
  occasion: string;
  package: 'basic' | 'pro' | 'premium';
  lyrics: string;
  musicStyle: string;
  generatedAt: Date;
  coverArtUrl?: string;
  dedicationText?: string;
  metadata?: Record<string, any>;
}

// Generate PDF using browser native printing or a PDF library
export async function generatePDF(data: PDFData): Promise<Blob> {
  try {
    // Option 1: Use browser's native printing (development)
    // In production, use a backend service like PDFKit or html2pdf

    const { recipientName, occasion, package: pkg, lyrics, musicStyle, generatedAt } = data;

    // Create HTML content for PDF
    // Create HTML content for PDF
    const htmlContent = `
<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pesma za ${recipientName}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Georgia', serif;
      color: #333;
      line-height: 1.8;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
      background: linear-gradient(135deg, #fff1f0 0%, #ffffff 100%);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding: 30px;
      border: 2px solid #ff6b6b;
      border-radius: 20px;
      background: white;
      box-shadow: 0 10px 40px rgba(255, 107, 107, 0.2);
    }
    .logo {
      font-size: 48px;
      margin-bottom: 20px;
    }
    .title {
      font-size: 28px;
      color: #ff6b6b;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .subtitle {
      font-size: 16px;
      color: #666;
      font-style: italic;
    }
    .song-info {
      background: white;
      padding: 30px;
      border-radius: 15px;
      margin-bottom: 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .info-row {
      display: flex;
      margin-bottom: 15px;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .info-label {
      font-weight: bold;
      color: #ff6b6b;
      min-width: 150px;
    }
    .info-value {
      color: #333;
    }
    .lyrics-container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      position: relative;
    }
    .lyrics-container::before {
      content: '"';
      position: absolute;
      top: 10px;
      left: 20px;
      font-size: 80px;
      color: #ff6b6b;
      opacity: 0.2;
      font-family: Georgia, serif;
    }
    .lyrics {
      white-space: pre-wrap;
      font-size: 18px;
      text-align: center;
      line-height: 2.2;
      color: #444;
    }
    .section-label {
      font-size: 14px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 30px;
      margin-bottom: 10px;
      font-style: italic;
    }
    .dedication {
      background: linear-gradient(135deg, #ff6b6b 0%, #f59e0b 100%);
      color: white;
      padding: 20px;
      border-radius: 15px;
      margin-bottom: 30px;
      text-align: center;
      font-size: 20px;
      font-style: italic;
      box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      color: #999;
      font-size: 14px;
    }
    .cover-art {
      width: 150px;
      height: 150px;
      border-radius: 15px;
      margin: 20px auto;
      display: block;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">🎵</div>
    <div class="title">PESMA ZA ${recipientName.toUpperCase()}</div>
    <div class="subtitle">Personalizovana pesma napravljena sa ljubavlju</div>
  </div>

  ${data.coverArtUrl ? `<img src="${data.coverArtUrl}" class="cover-art" alt="Cover Art">` : ''}

  ${data.dedicationText ? `
    <div class="dedication">
      "${data.dedicationText}"
    </div>
  ` : ''}

  <div class="song-info">
    <div class="info-row">
      <div class="info-label">Za:</div>
      <div class="info-value">${recipientName}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Prilika:</div>
      <div class="info-value">${occasion}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Muzički stil:</div>
      <div class="info-value">${musicStyle}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Paket:</div>
      <div class="info-value">${pkg.toUpperCase()}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Kreirano:</div>
      <div class="info-value">${generatedAt.toLocaleDateString('sr-RS')}</div>
    </div>
  </div>

  <div class="lyrics-container">
    <div class="lyrics">${lyrics}</div>
  </div>

  <div class="footer">
    <p><strong>🎵 Pesma Za Tebe</strong></p>
    <p>Svaka priča zaslužuje svoju melodiju</p>
    <p style="margin-top: 15px;">
      <a href="https://pesmazgatebe.com" style="color: #ff6b6b;">napravi svoju pesmu</a>
    </p>
  </div>
</body>
</html>
    `;

    // Convert HTML to PDF
    // In production, this would use a service like:
    // - PDFKit (Node.js)
    // - html2pdf.js (client-side)
    // - Puppeteer (server-side)

    // For now, we'll create a mock PDF blob
    // In production, uncomment one of the options below

    // Option 1: Use html2pdf.js client-side library
    /*
    const html2pdf = (await import('html2pdf.js')).default;
    const pdf = await html2pdf().set({
      margin: 10,
      filename: `pesma-za-${recipientName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(htmlContent).save();

    return pdf;
    */

    // Silence unused variable warning (htmlContent is for future use)
    void htmlContent;

    // Option 2: Create a text blob (simple approach)
    const textContent = `
═══════════════════════════════════════════════════════════
  🎵 PESMA ZA ${recipientName.toUpperCase()} 🎵
═══════════════════════════════════════════════════════════

Personalizovana pesma napravljena sa ljubavlju

───────────────────────────────────────────────────────────
Z: ${recipientName}
Prilika: ${occasion}
Muzički stil: ${musicStyle}
Paket: ${pkg.toUpperCase()}
Kreirano: ${generatedAt.toLocaleDateString('sr-RS')}
───────────────────────────────────────────────────────────

${data.dedicationText ? `
"${data.dedicationText}"
───────────────────────────────────────────────────────────
` : ''}

${lyrics}

═══════════════════════════════════════════════════════════
  🎵 Pesma Za Tebe - Svaka priča zaslužuje svoju melodiju 🎵
  https://pesmazgatebe.com
═══════════════════════════════════════════════════════════
`;

    return new Blob([textContent], { type: 'text/plain' });
  } catch (error) {
    console.error('[PDF] Failed to generate PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}

// Download PDF file
export function downloadPDF(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Generate PDF filename
export function generatePDFFilename(recipientName: string, occasion: string): string {
  const sanitized = recipientName.replace(/[^a-zA-Z0-9šđčćžŠĐČĆŽ]/g, '_');
  const date = new Date().toISOString().split('T')[0];
  return `pesma-za-${sanitized}-${occasion}-${date}.pdf`;
}