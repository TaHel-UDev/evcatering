import nodemailer from 'nodemailer';

// Интерфейс для данных заявки
interface RequestEmailData {
  name: string;
  phone: string;
  preferences?: string | null;
  comment?: string | null;
}

// Создаем транспортер для отправки email
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true для 465, false для других портов
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Функция для отправки email о заявке на кейтеринг
export async function sendRequestEmail(
  toEmail: string,
  data: RequestEmailData,
  franchiseName?: string
) {
  const transporter = createTransporter();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
          }
          .field {
            margin-bottom: 15px;
          }
          .field-label {
            font-weight: bold;
            color: #555;
          }
          .field-value {
            margin-top: 5px;
            padding: 10px;
            background-color: white;
            border-left: 3px solid #4CAF50;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Новая заявка на кейтеринг</h2>
          </div>
          <div class="content">
            ${franchiseName ? `
            <div class="field">
              <div class="field-label">Франчайзи:</div>
              <div class="field-value">${franchiseName}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="field-label">Имя клиента:</div>
              <div class="field-value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Телефон:</div>
              <div class="field-value">${data.phone}</div>
            </div>
            
            ${data.preferences ? `
            <div class="field">
              <div class="field-label">Предпочтения:</div>
              <div class="field-value">${data.preferences}</div>
            </div>
            ` : ''}
            
            ${data.comment ? `
            <div class="field">
              <div class="field-label">Комментарий:</div>
              <div class="field-value">${data.comment}</div>
            </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
Новая заявка на кейтеринг

${franchiseName ? `Франчайзи: ${franchiseName}` : ''}
Имя клиента: ${data.name}
Телефон: ${data.phone}
${data.preferences ? `Предпочтения: ${data.preferences}` : ''}
${data.comment ? `Комментарий: ${data.comment}` : ''}
  `.trim();

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Эстетика Вкуса'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Новая заявка на кейтеринг от ${data.name}`,
      text: textContent,
      html: htmlContent,
    });

    console.log('✅ Email успешно отправлен:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('❌ Ошибка отправки email:', error);
    throw new Error(`Не удалось отправить email: ${error.message}`);
  }
}

// Функция для отправки email о заявке на франчайзинг
export async function sendFranchiseRequestEmail(
  toEmail: string,
  data: RequestEmailData
) {
  const transporter = createTransporter();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #2196F3;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
          }
          .field {
            margin-bottom: 15px;
          }
          .field-label {
            font-weight: bold;
            color: #555;
          }
          .field-value {
            margin-top: 5px;
            padding: 10px;
            background-color: white;
            border-left: 3px solid #2196F3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Новая заявка на франчайзинг</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Имя:</div>
              <div class="field-value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Телефон:</div>
              <div class="field-value">${data.phone}</div>
            </div>
            
            ${data.comment ? `
            <div class="field">
              <div class="field-label">Комментарий:</div>
              <div class="field-value">${data.comment}</div>
            </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
Новая заявка на франчайзинг

Имя: ${data.name}
Телефон: ${data.phone}
${data.comment ? `Комментарий: ${data.comment}` : ''}
  `.trim();

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Эстетика Вкуса'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Новая заявка на франчайзинг от ${data.name}`,
      text: textContent,
      html: htmlContent,
    });

    console.log('✅ Email успешно отправлен:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('❌ Ошибка отправки email:', error);
    throw new Error(`Не удалось отправить email: ${error.message}`);
  }
}

