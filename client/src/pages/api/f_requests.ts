import type { NextApiRequest, NextApiResponse } from 'next';
import { createDirectus, createItem, rest } from '@directus/sdk';
import { sendFranchiseRequestEmail } from '@/lib/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, comment, email } = req.body;

    // Валидация
    if (!name || !phone) {
      return res.status(400).json({
        error: 'Обязательные поля: name, phone'
      });
    }

    if (!email) {
      return res.status(400).json({
        error: 'Email для отправки не указан'
      });
    }

    // Создаем клиент Directus
    const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS || '').with(rest());

    // Создаем заявку на франчайзинг
    // Обрезаем комментарий для БД, так как поле имеет лимит 255 символов (String)
    // Полная информация уйдет на почту
    const dbComment = comment && comment.length > 255
      ? comment.substring(0, 252) + '...'
      : (comment || null);

    const newRequest = await directus.request(
      createItem('f_requests', {
        name,
        phone,
        comment: dbComment,
      }, {
        fields: ['*']
      })
    );

    // Отправляем email
    try {
      await sendFranchiseRequestEmail(email, {
        name,
        phone,
        comment,
      });
      console.log('✅ Email успешно отправлен на:', email);
    } catch (emailError: any) {
      console.error('⚠️ Ошибка отправки email:', emailError.message);
      // Продолжаем выполнение, так как заявка уже создана в БД
    }

    return res.status(201).json({
      success: true,
      data: newRequest
    });

  } catch (error: any) {
    console.error('❌ Ошибка создания заявки на франчайзинг:', error);
    return res.status(500).json({
      error: 'Не удалось создать заявку',
      details: error.message
    });
  }
}

