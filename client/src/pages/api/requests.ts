import type { NextApiRequest, NextApiResponse } from 'next';
import { createDirectus, createItem, readItem, rest } from '@directus/sdk';
import { sendRequestEmail } from '@/lib/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, preferences, franchise_id } = req.body;

    // Валидация
    if (!name || !phone || !franchise_id) {
      return res.status(400).json({ 
        error: 'Обязательные поля: name, phone, franchise_id' 
      });
    }

    // Создаем клиент Directus
    const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS || '').with(rest());

    // Получаем данные франчайзи для получения email
    let franchiseName = '';
    let franchiseEmail = '';
    
    try {
      const franchise = await directus.request(
        readItem('franchises', franchise_id, {
          fields: ['id', 'name', 'mail']
        })
      ) as { id: number; name: string; mail: string };
      
      franchiseName = franchise.name;
      franchiseEmail = franchise.mail;
    } catch (franchiseError: any) {
      console.error('⚠️ Ошибка получения данных франчайзи:', franchiseError);
      // Продолжаем без email, но логируем ошибку
    }

    // Создаем заявку
    const newRequest = await directus.request(
      createItem('request', {
        name,
        phone,
        preferences: preferences || null,
        franchise_id: franchise_id,
      })
    );

    // Отправляем email, если есть адрес франчайзи
    if (franchiseEmail) {
      try {
        await sendRequestEmail(franchiseEmail, {
          name,
          phone,
          preferences,
        }, franchiseName);
        console.log('✅ Email успешно отправлен на:', franchiseEmail);
      } catch (emailError: any) {
        console.error('⚠️ Ошибка отправки email:', emailError.message);
        // Продолжаем выполнение, так как заявка уже создана в БД
      }
    } else {
      console.warn('⚠️ Email франчайзи не найден, письмо не отправлено');
    }

    return res.status(201).json({ 
      success: true, 
      data: newRequest 
    });

  } catch (error: any) {
    console.error('❌ Ошибка создания заявки:', error);
    return res.status(500).json({ 
      error: 'Не удалось создать заявку',
      details: error.message 
    });
  }
}

